---
layout: post
title:  "Configuring OIDC SSO Authentication with HPE GreenLake: Microsoft Entra ID, Okta, and Ping Identity, with HPECOMCmdlets Integration"
categories: GreenLake
image: /assets/images/OIDC-SSO/banner.jpg
excerpt: A step-by-step guide to configuring OpenID Connect (OIDC) single sign-on for HPE GreenLake with Microsoft Entra ID, Okta, and Ping Identity, the simpler alternative to SAML 2.0 with no signing certificate to rotate, and to signing in with the HPECOMCmdlets PowerShell module (v1.0.27+).
published: true
tags: 
   - greenlake
   - oidc
   - sso
   - idp
   - powershell
   - authentication
collapsible: true
collapsible_expanded: true
maxheader: 3
---
<a id="top"></a>

> Configuration steps verified with Okta, Microsoft Entra ID, and PingOne as of November 2026.

In my [SAML SSO guide]({{ site.baseurl }}/Configuring-SAML-SSO-with-HPE-GreenLake-and-Passwordless-Authentication-for-HPECOMCmdlets/), I walked through federating HPE GreenLake with the three most popular enterprise identity providers using SAML 2.0. HPE GreenLake also supports **OpenID Connect (OIDC)**, and since version [1.0.27](https://github.com/jullienl/HPE-COM-PowerShell-Library/releases/tag/v1.0.27), the [HPECOMCmdlets](https://github.com/jullienl/HPE-COM-PowerShell-Library) PowerShell module signs in to OIDC-federated workspaces exactly like SAML ones. This post shows how to configure an OIDC SSO connection with Microsoft Entra ID, Okta, and Ping Identity.

# Introduction

OIDC is an identity layer built on OAuth 2.0. Instead of exchanging SAML metadata and signing certificates, you register an application in your identity provider and give HPE GreenLake its **client ID** and **client secret**. HPE GreenLake then discovers the identity provider endpoints automatically from its **discovery URL**.

This guide covers:
- What changes compared to SAML 2.0, and when OIDC is the right choice
- Configuring an OIDC SSO connection with:
  - Microsoft Entra ID
  - Okta
  - Ping Identity
- Granting users access to HPE GreenLake with local role assignments
- Testing the sign-in from a browser and with HPECOMCmdlets
- Troubleshooting tips

**Time Required:** 30-45 minutes per identity provider  
**Skill Level:** Intermediate (identity management experience recommended)

# OIDC vs. SAML 2.0 in HPE GreenLake

Both protocols provide the same federated authentication: HPE GreenLake trusts your identity provider to verify who the user is, and never stores their password. Domain claiming, authentication policies, recovery users, and the passwordless and MFA setup for HPECOMCmdlets work the same way. The differences are:

<div class="table-wrapper" markdown="block">

| | SAML 2.0 | OIDC |
|:--|:--|:--|
| **Exchanged with the IdP** | Metadata (Entity ID, ACS URL, signing certificate) and attribute claims | Discovery URL, client ID, and client secret |
| **Credential to maintain** | IdP signing certificate, updated in HPE GreenLake when it rotates | Client secret, renewed in HPE GreenLake before it expires |
| **Authorization mode** | Local role assignments or IdP-managed (`hpe_ccs_attribute`) | **Local role assignments only** |
| **HPECOMCmdlets support** | v1.0.18 and later | v1.0.27 and later |
{: .col1-20}
</div>

> ⚠️ **Important**: An OIDC connection only supports **local role assignments**. Your identity provider authenticates users, but their workspace access and roles are defined in HPE GreenLake (manually, by script, or with SCIM). If you need your identity provider to drive roles through `hpe_ccs_attribute`, use SAML 2.0 instead.

[⬆ Back to Top](#)

# Prerequisites

**HPE GreenLake Requirements:**
- A workspace with **enhanced IAM** and enterprise capabilities enabled
- The **Workspace Administrator** or **Identity domain and SSO administrator** role
- A **verified domain** for SSO. Domain claiming is identical for SAML and OIDC: follow [Step 2: Register Entra ID in HPE GreenLake]({{ site.baseurl }}/Configuring-SAML-SSO-with-HPE-GreenLake-and-Passwordless-Authentication-for-HPECOMCmdlets/#step-2-register-entra-id-in-hpe-greenlake) in the SAML guide

**Identity Provider Requirements** (one of the following):
- **Microsoft Entra ID:** Application Administrator or Global Administrator role (granting admin consent requires a role allowed to consent for the tenant)
- **Okta:** Super Administrator or Organization Administrator role
- **Ping Identity:** Environment Administrator access to PingOne

**Optional (for HPECOMCmdlets):**
- PowerShell 7+
- HPECOMCmdlets module **v1.0.27 or later**
- A mobile device with an authenticator app (Microsoft Authenticator, Okta Verify, or PingID) for passwordless sign-in or MFA (push notification or TOTP code)

[⬆ Back to Top](#)

# How the HPE GreenLake OIDC Wizard Works

For every identity provider, the configuration alternates between HPE GreenLake and the identity provider, because each side needs a value from the other:

1. **HPE GreenLake**: start the **Create SSO connection** wizard, select OIDC, and enter the identity provider **discovery URL**. The wizard then displays the **GreenLake redirect URL**.
2. **Identity provider**: create an OIDC web application with that redirect URL, and copy its **client ID** and **client secret**.
3. **HPE GreenLake**: enter the client ID and secret, finish the wizard, and create an **authentication policy** that links your verified domain to the new connection.
4. **HPE GreenLake**: add the users and assign their roles (local role assignments).

Keep the wizard open in one browser tab and the identity provider console in another.

[⬆ Back to Top](#)

# Part 1: Configuring OIDC SSO with Microsoft Entra ID

Microsoft Entra ID (formerly Azure Active Directory) is Microsoft's cloud identity and access management service. In this part, you register HPE GreenLake as an OIDC web application in Entra ID, restrict it to a security group, and connect it to HPE GreenLake with its client ID and secret.

> **Before you begin**: Your domain must be claimed and verified in HPE GreenLake. If you have not done it yet, follow [Claim and verify a domain]({{ site.baseurl }}/Configuring-SAML-SSO-with-HPE-GreenLake-and-Passwordless-Authentication-for-HPECOMCmdlets/#1-claim-and-verify-a-domain) in the SAML guide. This step is identical for SAML and OIDC, and only needs to be done once per domain.

## Step 1: Get the Entra ID discovery URL

- In the Microsoft Entra admin center, open **Entra ID** → **Overview** and copy your **Tenant ID**.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-01.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-01.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- Build the tenant-specific OIDC discovery URL by replacing `<TENANT-ID>` with that value:

    <div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>https://login.microsoftonline.com/<mark>&lt;TENANT-ID&gt;</mark>/v2.0/.well-known/openid-configuration</code></pre></div></div>

    > **Tip**: Open this URL in a browser to check that it returns a JSON document. See Microsoft's [OpenID Connect on the Microsoft identity platform](https://learn.microsoft.com/en-us/entra/identity-platform/v2-protocols-oidc) documentation.

## Step 2: Start the OIDC connection in HPE GreenLake

- Log in to HPE GreenLake at [https://common.cloud.hpe.com/](https://common.cloud.hpe.com/), navigate to **Manage Workspace** → **SSO configuration**, and click **Create SSO connection**.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-02.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-02.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- Enter a descriptive **SSO connection name** (e.g., `EntraID-OIDC`) and select **OpenID Connect (OIDC)**.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-03.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-03.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- Leave **Automatically retrieve OIDC endpoints using metadata URL** selected, paste the discovery URL built in Step 1, and click **Verify**.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-04.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-04.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- Click **Next**. On the **Login client** page, copy the **GreenLake redirect URL** exactly as displayed. Keep this HPE GreenLake tab open: you will come back to it in Step 4 to enter the client ID and secret.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-05.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-05.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

[⬆ Back to Top](#)

## Step 3: Register the application in Entra ID

### 1. Create the app registration

- In the Microsoft Entra admin center, go to **Entra ID** → **App registrations** → **New registration**.
- Enter:
    - **Name**: for example, `HPE-GreenLake-OIDC`
    - **Supported account types**: **Single tenant only** (accounts in your organizational directory)
    - **Redirect URI**: platform **Web**, and paste the GreenLake redirect URL copied in Step 2

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-06.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-06.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- Click **Register**. On the **Overview** page, copy the **Application (client) ID**.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-07.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-07.png){:class="img-900"}{: data-lightbox="gallery"}{: .bordered-image-thin}

    > **Note**: The discovery URL is also available under **Overview** → **Endpoints** → **OpenID Connect metadata document** (v2.0). It is the same URL you built in Step 1.
    >
    > {: .small-space}
    >
    > [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-12.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-12.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

### 2. Create the client secret

- In the app registration, open **Certificates & secrets** → **Client secrets** → **New client secret**.
- Enter a description (e.g., `GreenLake-OIDC`), choose an expiry consistent with your organization's policy, and click **Add**.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-08.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-08.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- **Immediately copy the secret's Value**, not its Secret ID. The value is displayed only once.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-09.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-09.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

    > **Important**: Record the expiry date. When the secret expires, all SSO sign-ins through this connection fail, so create a new secret and update it in HPE GreenLake before that date. See Microsoft's [Add credentials](https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials) documentation.

### 3. Grant admin consent

Without admin consent, each user is asked to approve the application's permissions at first sign-in:

[![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-13.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-13.png){:class="img-300"}{: data-lightbox="gallery"}{: .bordered-image-thin}
[![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-14.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-14.png){:class="img-300"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- To avoid this prompt, open **API permissions**, click **Grant admin consent for &lt;your tenant&gt;**, and confirm.

  [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-15.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-15.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}


### 4. Restrict access to a group

By default, any user in the tenant can sign in to the application. To limit access to a security group:

- Go to **Enterprise applications** and open the OIDC application (it has the same name as the app registration).
- Under **Properties**, set **Assignment required?** to **Yes** and click **Save**.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-10.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-10.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

    You can also enable the **Visible to users** option to make users see the application on My Apps and O365 app launcher.

- Under **Users and groups**, click **Add user/group** and select the group (or users) allowed to sign in to HPE GreenLake.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-11.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-11.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

    Users who are not assigned get error `AADSTS50105` at sign-in.


[⬆ Back to Top](#)

## Step 4: Complete the OIDC connection in HPE GreenLake

- Return to the HPE GreenLake browser tab where the **Create SSO connection** wizard is still open on the **Login client** page (from Step 2), and enter the values copied from Entra ID:

  <div class="table-wrapper" markdown="block">
  
  | HPE GreenLake setting | Entra ID value |
  |:--|:--|
  | **Client ID** | Application (client) ID |
  | **Client secret** | Client secret **Value** |
  | **Use PKCE** | Leave enabled, as HPE recommends |
  {: .col1-20}
  </div>

  [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-16.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-16.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- On the **Session timeout** page, enter the desired session duration and click **Next**.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-17.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-17.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- Review the settings and click **Create SSO connection**.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-18.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-18.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

[⬆ Back to Top](#)

## Step 5: Create the authentication policy

The authentication policy links your verified domain to the OIDC connection and activates SSO for its users.

- After creating the connection, create a new authentication policy.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-19.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-19.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- Select your verified domain and the OIDC SSO connection. The authorization mode is **Local role assignments**, the only mode available with OIDC.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-20.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-20.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- Create a **recovery user**. This local account lets you sign in to HPE GreenLake if the SSO connection stops working (for example, after the client secret expires). Store its credentials securely.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-21.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-21.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- Click **Create**.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-22.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-22.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- The authentication policy is created and SSO is now active for the domain.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-23.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-23.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

> **Next**: Add the users and assign their roles, as described in [Granting Users Access with Local Role Assignments](#granting-users-access-with-local-role-assignments). Successful authentication alone does not give access to a workspace.

## Step 6: Passwordless and MFA setup for HPECOMCmdlets

The Entra ID authentication methods and Conditional Access policies for passwordless sign-in and MFA do not depend on the federation protocol. Follow [Step 4 of the SAML guide for Entra ID]({{ site.baseurl }}/Configuring-SAML-SSO-with-HPE-GreenLake-and-Passwordless-Authentication-for-HPECOMCmdlets/#step-4-entra-id-configuration-guide-for-hpecomcmdlets-sso-integration), and target the new **OIDC enterprise application** in your Conditional Access policies instead of the SAML one.

[⬆ Back to Top](#)

# Part 2: Configuring OIDC SSO with Okta

Okta is a cloud identity platform widely used for workforce single sign-on. In this part, you create an OIDC web application in Okta, assign it to a group, apply your sign-in policies, and connect it to HPE GreenLake with its client ID and secret.

> **Before you begin**: Your domain must be claimed and verified in HPE GreenLake. If you have not done it yet, follow [Claim and verify a domain]({{ site.baseurl }}/Configuring-SAML-SSO-with-HPE-GreenLake-and-Passwordless-Authentication-for-HPECOMCmdlets/#1-claim-and-verify-a-domain) in the SAML guide. This step is identical for SAML and OIDC, and only needs to be done once per domain.

## Step 1: Start the OIDC connection in HPE GreenLake

- Log in to HPE GreenLake at [https://common.cloud.hpe.com/](https://common.cloud.hpe.com/), navigate to **Manage Workspace** → **SSO configuration**, and click **Create SSO connection**.
- Enter a descriptive **SSO connection name** (e.g., `Okta-OIDC`) and select **OpenID Connect (OIDC)**.
- Leave **Automatically retrieve OIDC endpoints using metadata URL** selected and enter your Okta discovery URL. For the Okta organization authorization server, the format is:

    <div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>https://<mark>&lt;your-company&gt;</mark>.okta.com/.well-known/openid-configuration</code></pre></div></div>

- Click **Verify**.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-25.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-25.png){:class="img-600"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- On the **Login client** page, copy the **GreenLake redirect URL** exactly as displayed. Keep this HPE GreenLake tab open: you will come back to it in Step 5 to enter the client ID and secret.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-26.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-26.png){:class="img-600"}{: data-lightbox="gallery"}{: .bordered-image-thin}

[⬆ Back to Top](#)

## Step 2: Prepare users and a group in Okta

- If needed, create the users in **Directory** → **People** → **Add person**, using the email address of your verified domain.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-27.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-27.png){:class="img-500"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- In **Directory** → **Groups** → **Add group**, create a group such as `HPE-GreenLake-OIDC` and add the members allowed to sign in to HPE GreenLake.

[⬆ Back to Top](#)

## Step 3: Create the OIDC application in Okta

- In the Okta Admin Console, navigate to **Applications and Resources** → **Applications** → **Create App Integration** → **Classic experience**.
- Select **OIDC - OpenID Connect**, then **Web Application**, and click **Next**.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-30.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-30.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- Configure the application:

   <div class="table-wrapper" markdown="block">
   | Okta field | Setting |
   |:--|:--|
   | **App integration name** | `HPE GreenLake OIDC` |
   | **Grant type** | **Client Credentials** and **Authorization Code** |
   | **Sign-in redirect URIs** | The exact GreenLake redirect URL copied in Step 1 |
   | **Controlled access** | Limit access to the `HPE-GreenLake-OIDC` group |
   {: .col1-20}
   </div>

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-30a.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-30a.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- Click **Save**. Under **General** → **Client Credentials**, copy the **Client ID** and **Client Secret**.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-30b.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-30b.png){:class="img-600"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- Under **Assignments**, check that the group(s) allowed to sign in are assigned.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-31.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-31.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- **Optional: show the application on the Okta dashboard.** Open **General** → **General Settings** → **Edit**. If **Login initiated by** is **App Only**, the application does not appear as a dashboard tile. Select **Either Okta or App**, enable **Display application icon to users**, and set **Initiate login URI** to `https://common.cloud.hpe.com/`.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-32.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-32.png){:class="img-500"}{: data-lightbox="gallery"}{: .bordered-image-thin}

    > **Note**: The tile simply opens HPE GreenLake, which then starts the regular sign-in flow. OIDC has no equivalent to the SAML IdP-initiated flow.

[⬆ Back to Top](#)

## Step 4: Apply your Okta sign-in policies

The Okta policies used for passwordless sign-in and MFA with HPECOMCmdlets are the same as for SAML: follow [Step 4 of the SAML guide for Okta]({{ site.baseurl }}/Configuring-SAML-SSO-with-HPE-GreenLake-and-Passwordless-Authentication-for-HPECOMCmdlets/#step-4-okta-configuration-guide-for-hpecomcmdlets-sso-integration). For the OIDC application, make sure that:

- **App sign-in policy**: the authentication policy is assigned to the new OIDC application, and its rules (for example, the Okta Verify TOTP rule) include the `HPE-GreenLake-OIDC` group under **User's group membership includes**.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-28.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-28.png){:class="img-900"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- **Authenticator enrollment policy**: in **Security** → **Authenticators** → **Enrollment**, the Okta Verify enrollment policy includes the `HPE-GreenLake-OIDC` group.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-29.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-29.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- **Global session policy**: in **Security** → **Global Session Policy**, the policies apply to the correct groups.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-33.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-33.png){:class="img-800"}{: data-lightbox="gallery"}{: .bordered-image-thin}

[⬆ Back to Top](#)

## Step 5: Complete the OIDC connection in HPE GreenLake

- Return to the HPE GreenLake browser tab where the **Create SSO connection** wizard is still open on the **Login client** page (from Step 1), and enter the values copied from Okta:

   | HPE GreenLake setting | Okta value |
   |:--|:--|
   | **Client ID** | Okta application Client ID |
   | **Client secret** | Okta application Client Secret |
   | **Use PKCE** | Enabled |
   {: .col1-20}
 
   [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-34.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-34.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- Complete the remaining wizard steps (session timeout, review) and click **Create SSO connection**.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-35.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-35.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- Create the authentication policy as described in [Part 1, Step 5](#step-5-create-the-authentication-policy): select your verified domain, the Okta OIDC connection, **Local role assignments**, and configure the recovery user.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-36.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-36.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

> **Next**: Add the users and assign their roles in HPE GreenLake, as described in [Granting Users Access with Local Role Assignments](#granting-users-access-with-local-role-assignments). Assigning the application in Okta allows users to authenticate; HPE GreenLake role assignments determine what they can access.

[⬆ Back to Top](#)

# Part 3: Configuring OIDC SSO with Ping Identity

PingOne is Ping Identity's cloud identity platform, with PingID providing multi-factor authentication. In this part, you create an OIDC web application in PingOne, grant it to a group, assign your authentication policy, and connect it to HPE GreenLake with its client ID and secret.

> **Before you begin**: Your domain must be claimed and verified in HPE GreenLake. If you have not done it yet, follow [Claim and verify a domain]({{ site.baseurl }}/Configuring-SAML-SSO-with-HPE-GreenLake-and-Passwordless-Authentication-for-HPECOMCmdlets/#1-claim-and-verify-a-domain) in the SAML guide. This step is identical for SAML and OIDC, and only needs to be done once per domain.

## Step 1: Start the OIDC connection in HPE GreenLake

- Log in to HPE GreenLake at [https://common.cloud.hpe.com/](https://common.cloud.hpe.com/), navigate to **Manage Workspace** → **SSO configuration**, and click **Create SSO connection**.
- Enter a descriptive **SSO connection name** (e.g., `PingOne-OIDC`) and select **OpenID Connect (OIDC)**.
- Leave **Automatically retrieve OIDC endpoints using metadata URL** selected and enter your PingOne discovery URL:

    <div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>https://auth.pingone.<mark>&lt;region&gt;</mark>/<mark>&lt;environment-ID&gt;</mark>/as/.well-known/openid-configuration</code></pre></div></div>

    Where `<region>` is the top-level domain of your PingOne region (for example `com`, `eu`, or `asia`). You can also copy the exact URL from the application details in Step 4.

- Click **Verify**.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-37.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-37.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- On the **Login client** page, copy the **GreenLake redirect URL** exactly as displayed. Keep this HPE GreenLake tab open: you will come back to it in Step 5 to enter the client ID and secret.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-38.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-38.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

[⬆ Back to Top](#)

## Step 2: Prepare users and a group in PingOne

- If needed, create the users in **Directory** → **Users** → **Add User**, using the email address of your verified domain.
- In **Directory** → **Groups**, create a group such as `HPE-GreenLake-OIDC` and add the members allowed to sign in to HPE GreenLake.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-39.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-39.png){:class="img-900"}{: data-lightbox="gallery"}{: .bordered-image-thin}

[⬆ Back to Top](#)

## Step 3: Create and configure the OIDC application in PingOne

- In PingOne, select the environment containing your users and go to **Applications** → **Applications**.
- Click **+**, enter a name such as `HPE GreenLake OIDC`, select **OIDC Web App**, and click **Save**.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-40.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-40.png){:class="img-600"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- Open the application's **Configuration** tab and edit its settings:

  <div class="table-wrapper" markdown="block">
  
  | PingOne setting | Configuration |
  |:--|:--|
  | **Response type** | Code |
  | **Grant type** | Authorization Code |
  | **Redirect URIs** | The exact GreenLake redirect URL copied in Step 1 |
  | **Token endpoint authentication method** | **Client Secret Post** |
  | **Initiate login URI** | (Optional) `https://common.cloud.hpe.com/`, to show the application in the users' PingOne app portal |
  {: .col1-20}
  </div>
  
  [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-41.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-41.png){:class="img-600"}{: data-lightbox="gallery"}{: .bordered-image-thin}

  > ⚠️ **Important**: The **Token endpoint authentication method** must be **Client Secret Post**. With another method, HPE GreenLake rejects the sign-in with error `HPE_GL_IDENTITY_OIDC_REQUEST_INVALID_4606`, even in a browser.

- In the **Access** tab, select **Display this application in the application portal** and authorize the `HPE-GreenLake-OIDC` group.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-42.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-42.png){:class="img-500"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- In the **Policies** tab, assign the authentication policy you use for HPE GreenLake, including the PingID MFA step. For passwordless sign-in or MFA with HPECOMCmdlets, use the policy described in [Step 4 of the SAML guide for PingID]({{ site.baseurl }}/Configuring-SAML-SSO-with-HPE-GreenLake-and-Passwordless-Authentication-for-HPECOMCmdlets/#step-4-pingid-configuration-guide-for-hpecomcmdlets-sso-integration).

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-43.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-43.png){:class="img-600"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- Enable the application with its toggle.

[⬆ Back to Top](#)

## Step 4: Collect the PingOne client values

On the application's **Overview** tab, copy the **Client ID** and **Client Secret**. The **Configuration** tab also lists the **OIDC Discovery Endpoint** and **Issuer** for your region and environment.

[![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-44.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-44.png){:class="img-600"}{: data-lightbox="gallery"}{: .bordered-image-thin}

[⬆ Back to Top](#)

## Step 5: Complete the OIDC connection in HPE GreenLake

- Return to the HPE GreenLake browser tab where the **Create SSO connection** wizard is still open on the **Login client** page (from Step 1). Enter the PingOne **Client ID** and **Client secret** copied in Step 4, and keep **Use PKCE** enabled.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-45.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-45.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- Complete the remaining wizard steps and click **Create SSO connection**.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-46.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-46.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- Create the authentication policy as described in [Part 1, Step 5](#step-5-create-the-authentication-policy): select your verified domain, the PingOne OIDC connection, **Local role assignments**, and configure the recovery user.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-47.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-47.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin}

> **Next**: Add the users and assign their roles in HPE GreenLake, as described in the next section.

[⬆ Back to Top](#)

# Granting Users Access with Local Role Assignments

With OIDC, your identity provider only **authenticates** users. To access a workspace, each SSO user must exist in HPE GreenLake and have roles assigned there, either directly or through a **user group**. Assigning roles to user groups is the easiest model to maintain.

> **Important**: The email address returned by the identity provider must match the email address of the user in HPE GreenLake.

## Option 1: Manually in HPE GreenLake

- In the target workspace, open **IAM and administration** → **User groups**, create a group (e.g., `COM-Operators`), and assign the required workspace and service roles to it. A group must have role assignments for its members to get workspace access.

    [![]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-24.png)]( {{ site.baseurl }}/assets/images/OIDC-SSO/OIDC-SSO-24.png){:class="img-900"}{: data-lightbox="gallery"}{: .bordered-image-thin}

- Open **IAM and administration** → **Users** → **Add user**:
    - Select **New user** if the user is not yet in the organization directory, or **User from identity directory** if it already exists
    - Enter the full email address and add the user to the group
    - Click **Add user**

## Option 2: With HPECOMCmdlets

Since v1.0.27, users can be created with membership in user groups only, so their permissions come entirely from the group roles:

```powershell
Connect-HPEGL -Credential $recoveryCredential -Workspace "Production"

'user1@company.com', 'user2@company.com' | New-HPEGLUser -UserGroupName 'COM-Operators'
```

## Option 3: With SCIM provisioning

Options 1 and 2 work well for a few users, but they create a second list of users to maintain: when someone joins, changes team, or leaves, you must update both your identity provider and HPE GreenLake. **SCIM** (System for Cross-domain Identity Management, [RFC 7644](https://datatracker.ietf.org/doc/html/rfc7644)) removes this double work by letting your identity provider keep HPE GreenLake up to date automatically.

**How it works**

SCIM is a standard REST API for creating, updating, and deleting users and groups. Your identity provider acts as the **SCIM client** and HPE GreenLake as the **SCIM server**: the identity provider pushes changes to HPE GreenLake, never the other way around.

<div class="table-wrapper" markdown="block">

| What happens in your identity provider | What SCIM does in HPE GreenLake |
|:--|:--|
| A user is assigned to the SCIM application (directly or through a group) | Creates the user in the organization directory |
| A user's name or attributes change | Updates the user |
| A user joins or leaves a pushed group | Updates the group membership |
| A user is unassigned or disabled | Deactivates or removes the user |
{: .col1-30}
</div>

SCIM synchronizes **identities and group memberships, not permissions**. Roles are still assigned in HPE GreenLake, which is exactly the local role assignment model required by OIDC. The recommended pattern is:

1. Push groups from your identity provider (for example, `GL-COM-Operators` and `GL-Workspace-Admins`).
2. In HPE GreenLake, assign roles **once** to each synchronized group.
3. From then on, manage access only in your identity provider: adding a user to `GL-COM-Operators` gives them the corresponding HPE GreenLake roles at the next synchronization, and removing them takes the roles away.

> **Note**: Users and groups provisioned by SCIM are owned by your identity provider. Change them in the identity provider, not in HPE GreenLake, or the next synchronization overwrites your changes.

**How to set it up**

1. **In HPE GreenLake**, create a SCIM integration for your organization. HPE GreenLake provides the **SCIM endpoint URL** and an **access token** that the identity provider uses to authenticate. Store the token securely.
2. **In your identity provider**, enable provisioning for HPE GreenLake: enter the SCIM endpoint URL and token, test the connection, and check the attribute mappings (the user's email address must map to the SCIM `userName`).
3. **Scope the synchronization** by assigning the users and groups that should exist in HPE GreenLake, and select the groups to push.
4. **Start provisioning**, then check in HPE GreenLake that the users and groups appear.
5. **Assign roles** to the synchronized groups in HPE GreenLake.

> **Timing**: Synchronization is not instantaneous. Microsoft Entra ID, for example, runs an initial cycle and then incremental cycles roughly every 40 minutes, so a new team member may wait a little before getting access. Use **Provision on demand** in Entra ID to push a single user immediately when testing.

The exact screens and values depend on your identity provider. See the HPE GreenLake User Guide:
- [Setting up a SCIM integration](https://support.hpe.com/hpesc/public/docDisplay?docId=a00120892en_us&page=GUID-20B8600A-A3EE-435D-A004-ACBAD61E7520.html)
- [Configuring the SCIM integration in Microsoft Entra ID](https://support.hpe.com/hpesc/public/docDisplay?docId=a00120892en_us&page=GUID-95DE69AC-D215-4BAE-8898-9A9F489D7C86.html#ariaid-title1)
- [Configuring the SCIM integration in Okta](https://support.hpe.com/hpesc/public/docDisplay?docId=a00120892en_us&page=GUID-2F427FF8-7448-4C8A-9C4E-C1B32EFEAA2E.html)
- [Define SSO users with local role assignments (SCIM)](https://support.hpe.com/hpesc/public/docDisplay?docId=a00120892en_us&page=GUID-7B68A441-4F01-4267-9DB7-FE39B31E82F1.html#ariaid-title1)

[⬆ Back to Top](#)

# Testing OIDC SSO Authentication

## Test with a browser

- Open a private browser window and go to [https://common.cloud.hpe.com/](https://common.cloud.hpe.com/).
- Enter the full email address of a test user and click **Next**. You are redirected to your identity provider.
- Complete the authentication (password and/or MFA, depending on your policy).
- Confirm that you land in HPE GreenLake with the expected workspace and services available.

## Test with HPECOMCmdlets

HPECOMCmdlets v1.0.27 and later detects the federation protocol automatically, so the commands are the same as for SAML:

```powershell
# Install or update the module
Install-Module -Name HPECOMCmdlets -MinimumVersion 1.0.27

# Passwordless: approve the push notification on your phone
Connect-HPEGL -PasswordlessSSOEmail "user@company.com" -Workspace "Production"

# Password-based: password, then MFA step-up if your identity provider requires it
$cred = Get-Credential -UserName "user@company.com"
Connect-HPEGL -Credential $cred -Workspace "Production"
```

<div class="table-wrapper" markdown="block">

| Identity provider | Passwordless (`-PasswordlessSSOEmail`) | Password-based (`-Credential`) |
|:--|:--|:--|
| **Microsoft Entra ID** | Microsoft Authenticator push (number matching) | Password only, or password + Authenticator push or TOTP |
| **Okta** (Identity Engine) | Okta Verify push or TOTP | Password only, or password + Okta Verify |
| **Ping Identity** (PingOne SSO) | PingID push or OTP | Password only, or password + PingID |
{: .col1-20}
</div>

[⬆ Back to Top](#)

# Troubleshooting

- **`HPE_GL_IDENTITY_OIDC_REQUEST_INVALID_4606` (Ping Identity)**: set the PingOne application's **Token endpoint authentication method** to **Client Secret Post**.
- **`AADSTS50105` (Entra ID)**: the user is not assigned to the enterprise application. Add the user, or a group they belong to, under **Users and groups**.
- **Redirect URI mismatch error from the identity provider**: the redirect URI registered in the application must match the GreenLake redirect URL exactly. Copy it again from the **Login client** page.
- **Authentication succeeds but the user has no workspace access**: OIDC uses local role assignments only. Add the user to HPE GreenLake and assign roles, directly or through a user group.
- **All sign-ins suddenly fail**: check whether the client secret has expired. Create a new secret in the identity provider, update it in the HPE GreenLake SSO connection, and use the recovery user if you are locked out.
- **`Connect-HPEGL` says the sign-in flow has changed**: you are running an HPECOMCmdlets version older than 1.0.27. Run `Update-Module -Name HPECOMCmdlets`.
- **Sharing logs for support**: since v1.0.27, `-Verbose` output masks email addresses, tokens, authorization codes and cookies, so you can capture it safely:

    ```powershell
    Connect-HPEGL -Credential $cred -Workspace "Production" -Verbose *> signin-log.txt
    ```

[⬆ Back to Top](#)

# Conclusion

OIDC is the simplest way to federate HPE GreenLake with Microsoft Entra ID, Okta, or Ping Identity: a web application with a client ID and secret replaces SAML metadata and signing certificates. Keep in mind that it relies on local role assignments, and plan the renewal of the client secret. With HPECOMCmdlets v1.0.27 and later, your PowerShell automation works unchanged whether a workspace uses SAML 2.0 or OIDC.

I hope you find this guide useful. 

Drop a comment below with your setup wins!

# Additional Resources

- [Configuring SAML SSO Authentication with HPE GreenLake]({{ site.baseurl }}/Configuring-SAML-SSO-with-HPE-GreenLake-and-Passwordless-Authentication-for-HPECOMCmdlets/)
- [HPE GreenLake User Guide](https://support.hpe.com/hpesc/public/docDisplay?docId=a00120892en_us)
- [HPECOMCmdlets PowerShell Module](https://github.com/jullienl/HPE-COM-PowerShell-Library)
- [HPECOMCmdlets v1.0.27 release notes (OIDC support)](https://github.com/jullienl/HPE-COM-PowerShell-Library/releases/tag/v1.0.27)
- [OpenID Connect Core 1.0 Specification](https://openid.net/specs/openid-connect-core-1_0.html)

[⬆ Back to Top](#)

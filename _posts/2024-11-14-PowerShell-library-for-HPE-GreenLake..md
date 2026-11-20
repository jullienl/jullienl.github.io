---
layout: post
title:  "PowerShell Library for HPE Compute Ops Management"
categories: GreenLake
image: /assets/images/HPECOMCmdlets/banner.jpg
excerpt: Discover how to automate and manage your HPE GreenLake and Compute Ops Management environment using PowerShell with the HPECOMCmdlets library.
last_modified_at: 2026-11-20
tags: 
  - greenlake
  - com 
collapsible: true
collapsible_expanded: true
---

The HPECOMCmdlets PowerShell library for HPE Compute Ops Management provides a robust set of cmdlets designed to manage and automate your HPE GreenLake environment efficiently. By leveraging this library, users can seamlessly interact with HPE GreenLake and Compute Ops Management services directly from the PowerShell command line, integrating effortlessly into existing automation workflows.

Since its first release, the library has grown considerably — adding SAML and OIDC single sign-on with multiple identity providers, password-based and passwordless authentication, organization and access management, approval policies, webhooks, Secure Gateway discovery, OneView/OVE appliance management, and much more. It is actively maintained, with new capabilities added as HPE releases them. See the [releases page](https://github.com/jullienl/HPE-COM-PowerShell-Library/releases) for the full history of what's new in each version.


This module is available in the [PowerShell Gallery](https://www.powershellgallery.com/packages/HPECOMCmdlets) under the name `HPECOMCmdlets`, following the naming convention used by most HPE modules.

> The PowerShell Gallery is a repository for sharing and distributing PowerShell modules and scripts. It's a community-driven platform that provides access to various PowerShell resources, enabling you to easily discover, install, and publish your own PowerShell content. The PowerShell Gallery can be accessed through the PowerShellGet module (includes **Install-Module**, **Find-Module**, etc.), which comes pre-installed with Windows PowerShell 5.0 and above.

The source code is developed in the [HPE-COM-PowerShell-Library](https://github.com/jullienl/HPE-COM-PowerShell-Library) repository on my GitHub account, where you can also track [releases](https://github.com/jullienl/HPE-COM-PowerShell-Library/releases), report and view [issues](https://github.com/jullienl/HPE-COM-PowerShell-Library/issues), and participate in [discussions](https://github.com/jullienl/HPE-COM-PowerShell-Library/discussions).

> 🧪 **Prefer to learn by doing?** The free, self-paced [HPE Compute Ops Management Zero-Touch Automation hands-on lab](https://hpelabs.github.io/PowerShell-COM-Zero-Touch/) walks you through the full server lifecycle with this module, step by step.

> 📖 **The [README](https://github.com/jullienl/HPE-COM-PowerShell-Library/blob/main/README.md) is the most complete and up-to-date reference for the library** — covering supported authentication methods, the full identity-provider compatibility matrix, connection examples, global variables, best practices, troubleshooting, and telemetry. Whenever this blog and the README differ, the README is authoritative.

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-1.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-1.png){:class="img-100pct"}{: data-lightbox="gallery"}{: .bordered-image-thin} 


# Key Features

The library covers the HPE GreenLake platform and every Compute Ops Management instance in your workspace:

- **Authentication and sessions**: Connect with SAML 2.0 or OIDC single sign-on (Okta, Microsoft Entra ID, PingIdentity), passwordless or password-based, or with an HPE Account with or without MFA. One session covers every COM region, and sessions can be saved and restored for multi-workspace automation.
- **Workspace, identity and access**: Create and manage workspaces, organizations and tenant workspaces; claim domains and configure SSO connections and authentication policies; invite users and manage user groups, roles, and scope-based access control (SBAC).
- **Services, subscriptions and devices**: Provision Compute Ops Management, manage subscriptions and auto-subscription policies, add devices individually or in bulk from CSV files, set locations and tags, and remove (unclaim) devices.
- **Server onboarding and configuration**: Connect iLOs to COM directly, through a web proxy, or through a Secure Gateway (with automatic discovery). Create BIOS, storage, OS, firmware and iLO settings, and apply them to server groups.
- **Operations, compliance and insights**: Schedule firmware updates and other jobs, require approval for sensitive operations, check firmware, iLO settings and external storage compliance, collect inventory, health, warranty and logs, and review utilization and sustainability insights.
- **Notifications, integration and appliances**: Enable email notifications, deliver platform events to external endpoints with webhooks, integrate with ServiceNow, and manage HPE OneView, OVE and Secure Gateway appliances.

[↑ Back to Top](#)


# Requirements

- **PowerShell 7.0 or later** (Windows, Linux or macOS). Windows PowerShell 5.1 is not supported.
- **An HPE GreenLake account**: an HPE Account for direct sign-in, or a federated account if your organization uses single sign-on.
- **Roles**: to connect and view resources, you need at least **Workspace Observer** in HPE GreenLake and **Compute Ops Management Viewer** for each COM instance. Creating workspaces or provisioning COM requires the corresponding **Administrator** roles.
- **Workspace type**: Enhanced workspaces (IAMv2) are fully supported, including organizations, user groups and SBAC. Legacy workspaces (IAMv1) keep core functionality, but some newer identity features are not available.

For the complete list, see the [Requirements](https://github.com/jullienl/HPE-COM-PowerShell-Library#requirements) section of the README.

# Installation

To install the library, use the following command to download and install the module from the official PowerShell Gallery:

```powershell
Install-Module HPECOMCmdlets
```

Note: As a best practice, always install the newest release to get all the latest features and fixes.

If this is your first time installing a module from the PowerShell Gallery, you will be prompted to confirm whether you trust the repository. Type `Y` and press `Enter` to proceed.   

To confirm the installation:

```powershell
Get-Module HPECOMCmdlets -ListAvailable
```

## Common Issues and Troubleshooting
- **Internet Connection**: An active internet connection is required to install the module from the PowerShell Gallery.
- **No Dependencies**: This library has no external dependencies, so no additional software or modules are required for it to function.
- **Common Issues**:
    - **Insufficient Permissions**: If you encounter permission issues, run PowerShell as an administrator or use the `-Scope CurrentUser` parameter:

        ```powershell
        Install-Module HPECOMCmdlets -Scope CurrentUser
        ```
    - **Execution Policy Restrictions**: If the execution policy is set to `Restricted`, it may block the installation. Check your current policy using:

        ```powershell
        Get-ExecutionPolicy
        ```
        If it returns `Restricted`, update it to `RemoteSigned`:
        ```powershell
        Set-ExecutionPolicy RemoteSigned
        ```
        > **Warning**: Changing the execution policy affects the security of your system. Ensure you understand the implications before proceeding.

## How to Upgrade the Module

To move to the latest version, unload the module, install the new release, then remove the old one:

```powershell
# 1. Unload the module from memory (releases file locks)
Remove-Module HPECOMCmdlets -Force -ErrorAction SilentlyContinue

# 2. Note the version currently installed
$oldVersion = (Get-InstalledModule HPECOMCmdlets | Sort-Object Version -Descending | Select-Object -First 1).Version

# 3. Install the latest version
Install-Module -Name HPECOMCmdlets -Scope CurrentUser -Force -AllowClobber

# 4. Uninstall the old version, then verify
Uninstall-Module -Name HPECOMCmdlets -RequiredVersion $oldVersion
Get-Module HPECOMCmdlets -ListAvailable | Select-Object Name, Version, Path
```

> **Note**: Unloading the module first matters on Windows: without it, file locks can block the update, or the old version can stay active in your session.

[↑ Back to Top](#)


# Quick Start

Once the module is installed, you can be productive in a few lines:

```powershell
# 1. Connect (see the next section for every sign-in option)
Connect-HPEGL -Credential (Get-Credential) -Workspace "MyWorkspace"

# 2. Explore your environment
Get-HPEGLDevice                                      # Devices in the workspace
Get-HPEGLSubscription                                # Subscriptions
Get-HPECOMServer -Region "eu-central"                # Servers in a COM region
Get-HPECOMFirmwareBaseline -Region "eu-central"      # Available firmware bundles

# 3. Act on it
New-HPECOMGroup -Region "eu-central" -Name "Production-Servers"
Add-HPECOMServerToGroup -Region "eu-central" -ServerSerialNumber "CZ12312312" -GroupName "Production-Servers"
Get-HPECOMJob -Region "eu-central"                   # Track what is running

# 4. Disconnect when done (also cleans up the temporary API credentials)
Disconnect-HPEGL
```

A single connection gives you access to HPE GreenLake **and every Compute Ops Management instance provisioned in the workspace**. COM cmdlets use the `-Region` parameter (for example `eu-central`, `us-west` or `ap-northeast`) to target a specific instance.

[↑ Back to Top](#)


# Connecting to HPE GreenLake

Choose the sign-in method that matches your account:

| Your account | Parameter to use |
|---|---|
| HPE Account, password only or with MFA | `-Credential` |
| SSO (SAML or OIDC), passwordless: push or TOTP only | `-PasswordlessSSOEmail` |
| SSO (SAML or OIDC), with a password | `-Credential` with your federated email address |

## Using HPE Account Authentication (Single or Multi-Factor)

To connect using single or multi-factor authentication, follow these steps:

1. **Single-Factor Authentication**:

    Use the following command to connect with your email and password:

    ```powershell
    Connect-HPEGL -Credential (Get-Credential) -Workspace "YourWorkspaceName"
    ```

    [![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-4.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-4.png){:class="img-800"}{: data-lightbox="gallery"}{: .bordered-image-thin} 

    - **Note**: If you do not have a workspace yet, omit the `-Workspace` parameter. You can create a new workspace after your first connection using the `New-HPEGLWorkspace` cmdlet.

    - **Note**: The `-Credential` parameter is optional. If omitted, the module will prompt you to enter your username and password interactively.

    - **Tip**: Unsure of the workspace name? Connect without specifying the `-Workspace` parameter, then run `Get-HPEGLWorkspace` to list all available workspaces. Once identified, use `Connect-HPEGLWorkspace -Name "YourWorkspaceName"` to connect to the desired workspace.

2. **Multi-Factor Authentication (MFA)**:

    The library supports Multi-Factor Authentication (MFA) using **Google Authenticator** or **Okta Verify**. Before proceeding, ensure the appropriate app is installed on your device and linked to your account. For detailed guidance on setting up and using MFA with HPE GreenLake, refer to the [Multifactor Authentication Guide](https://support.hpe.com/hpesc/public/docDisplay?docId=a00120892en_us&page=GUID-61890E9B-F692-43F5-8229-0824797897D6.html#ariaid-title1).

    - For accounts with **Google Authenticator**, you will be prompted to enter the verification code.

    - For accounts with **Okta Verify**, approve the push notification on your mobile device.

    - If both are enabled, the library defaults to **Okta Verify**.     
                                   
    Use the same command as above to connect using Multi-Factor Authentication (MFA):

    ```powershell
    Connect-HPEGL -Credential (Get-Credential) -Workspace "YourWorkspaceName"
    ```

    > **Note**: FIDO2 security keys, passkeys, and biometric authenticators (Windows Hello, Touch ID) are not supported. If your account is configured for these methods only, enable Google Authenticator or Okta Verify in your account settings. Push notifications with number matching meet the same phishing-resistant security standards as FIDO2.

	- When MFA is enabled with **Okta**:
        - The cmdlet will prompt you to validate the push notification from **Okta Verify**.

            [![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-10.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-10.png){:class="img-800"}{: data-lightbox="gallery"}{: .bordered-image-thin} 

        - On your Okta-enabled device, press "Yes, it’s me" to approve the authentication request from **Okta Verify**.


            [![]({{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-11.png)]({{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-11.png){:class="img-300"}{: data-lightbox="gallery"}{: .bordered-image-thin}


    - When MFA is enabled with **Google Authenticator**:
       - The cmdlet will pause and prompt you to enter the MFA token.

            [![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-12.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-12.png){:class="img-800"}{: data-lightbox="gallery"}{: .bordered-image-thin} 

        - Open the **Google Authenticator** app on your device to retrieve the token and enter it when prompted.

            [![]({{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-15.png)]({{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-15.png){:class="img-300"}{: data-lightbox="gallery"}{: .bordered-image-thin}
         
## Using Single Sign-On (SAML or OIDC) with Okta, Microsoft Entra ID, or PingIdentity

The library supports single sign-on with three identity providers: **Okta** (Okta Identity Engine — OIE only; Classic is not supported), **Microsoft Entra ID** (commercial cloud), and **PingIdentity** (PingOne SSO environment). Both federation protocols offered by HPE GreenLake are supported: **SAML 2.0** and, since v1.0.27, **OpenID Connect (OIDC)**. The protocol configured for your workspace is detected automatically, so the same commands work for both.

Two sign-in modes are available depending on how your IdP account is configured:

- **Passwordless SSO** (`-PasswordlessSSOEmail`): no password is entered — you approve a push notification or enter a TOTP code.
- **Password-based SSO** (`-Credential`, v1.0.26+): you enter your federated password, and a second factor (push or TOTP) fires automatically if your IdP policy requires it. Because no interactive approval is needed when only a password is required, this mode — combined with a securely stored credential — enables truly unattended SSO automation.

In both modes, federation is detected automatically from your email domain — no additional parameters are required.

> **Note**: The `-SSOEmail` parameter was renamed to `-PasswordlessSSOEmail` in v1.0.26. The original `-SSOEmail` name still works as a backward-compatible alias.

> **Note on unsupported providers**: Identity providers other than Okta, Microsoft Entra ID, and PingIdentity (for example Google Workspace, OneLogin, Auth0, IBM Security Verify) are not supported for SSO. For these, sign in with native HPE Account credentials instead.

### Passwordless SSO (`-PasswordlessSSOEmail`)

1. **Prepare your authenticator app**:
    - Install your IdP's authenticator (Okta Verify, Microsoft Authenticator, or PingID) and link it to your account by following your organization's setup instructions.

2. **Authentication Process**:
    - Connect using your federated email address:

      ```powershell
      Connect-HPEGL -PasswordlessSSOEmail "firstname.lastname@domain.com" -Workspace "YourWorkspaceName"
      ```

    - If you do not have a workspace yet, omit the `-Workspace` parameter. You can create a new workspace after your first connection using the `New-HPEGLWorkspace` cmdlet.

3. **Validation**:
    - During the connection process, you will be prompted to approve the push notification (or enter the TOTP code) from your IdP's authenticator app. For push with number matching, the number to confirm is shown in your terminal.

        [![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-13.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-13.png){:class="img-800"}{: data-lightbox="gallery"}{: .bordered-image-thin} 

    - Open your authenticator app and approve the request (for example, select the matching number) to complete the authentication process.

        [![]({{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-14.png)]({{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-14.png){:class="img-300"}{: data-lightbox="gallery"}{: .bordered-image-thin}

> **HPE corporate accounts (`@hpe.com`)** are federated through HPE's internal Okta, which is passwordless: sign in with `-PasswordlessSSOEmail` and approve the push notification.

### Password-based SSO (`-Credential`)

1. **Authentication Process**:
    - Connect using `-Credential` with your federated email address — federation is detected automatically:

      ```powershell
      Connect-HPEGL -Credential (Get-Credential -UserName "firstname.lastname@domain.com") -Workspace "YourWorkspaceName"
      ```

    - You will be prompted for your federated password. If your IdP policy requires a second factor, a push or TOTP challenge fires automatically after the password is accepted.

2. **Tips**:
    - If `-Credential` is used but your IdP account is passwordless-only, the supplied password is ignored and the normal push/TOTP flow proceeds (with a warning), so starting with `-Credential` is always safe.
    - Unsure of the workspace name? Connect without specifying the `-Workspace` parameter, then run `Get-HPEGLWorkspace` to list all available workspaces. Once identified, use `Connect-HPEGLWorkspace -Name "YourWorkspaceName"` to connect to the desired workspace.

> **Entra ID note**: TOTP codes are supported only in the **password-based** flow (`-Credential`). The Entra ID **passwordless** flow relies exclusively on Microsoft Authenticator push notifications with mandatory number matching.

### Setting up SSO in your workspace

If SSO is not configured yet, a Workspace Administrator can set it up from PowerShell: claim and verify your email domain, create the SSO connection, then apply the authentication policy that links them.

```powershell
New-HPEGLDomain -Name "example.com"          # Returns the DNS TXT record to publish
Test-HPEGLDomain -Name "example.com"         # Verifies the domain once the record is published

$recoveryPassword = ConvertTo-SecureString "MySecurePass123!" -AsPlainText -Force
New-HPEGLSSOConnection -Name "Okta SSO" -SAML20 `
    -MetadataSource "https://idp.example.com/federationmetadata/2007-06/federationmetadata.xml" `
    -RecoveryAccountSecurePassword $recoveryPassword `
    -RecoveryAccountContactEmail "it-admin@example.com"

New-HPEGLSSOAuthenticationPolicy -VerifiedDomainName "example.com" `
    -SSOConnectionName "Okta SSO" `
    -AuthorizationMethod "AuthorizationMode" `
    -RecoveryAccountSecurePassword $recoveryPassword `
    -RecoveryAccountContactEmail "it-admin@example.com"
```

Run `Get-Help New-HPEGLSSOConnection -Examples` for OIDC connections and other scenarios. For complete, illustrated walkthroughs, including the identity provider side, see my guides:

- [Configuring SAML SSO with HPE GreenLake for Okta, Microsoft Entra ID, and Ping Identity](https://jullienl.github.io/Configuring-SAML-SSO-with-HPE-GreenLake-and-Passwordless-Authentication-for-HPECOMCmdlets)
- [Configuring OIDC SSO with HPE GreenLake for Okta, Microsoft Entra ID, and Ping Identity](https://jullienl.github.io/Configuring-OIDC-SSO-with-HPE-GreenLake-for-HPECOMCmdlets/)

For HPE's official guidance, refer to the [Authentication Guide](https://support.hpe.com/hpesc/public/docDisplay?docId=a00120892en_us&page=GUID-D7192971-EF71-4304-B51E-548E7954E644.html#ariaid-title1).

[↑ Back to Top](#)


# Working with Sessions

## Global Session Object: `$HPEGreenLakeSession`

Upon successful connection, the `Connect-HPEGL` cmdlet returns:

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-5.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-5.png){:class="img-800"}{: data-lightbox="gallery"}{: .bordered-image-thin} 

- A persistent session that is used for all subsequent cmdlet requests within the module.
- Temporary API client credentials for both HPE GreenLake and any Compute Ops Management service instances provisioned in the workspace.
- A global session object stored in the `$HPEGreenLakeSession` variable, which contains session details, API client credentials, access tokens, and other relevant information for interacting with HPE GreenLake and Compute Ops Management APIs.


[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-6.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-6.png){:class="img-800"}{: data-lightbox="gallery"}{: .bordered-image-thin} 

The BIG session object includes:

- **OAuth2 tokens**: access, refresh and ID tokens.
- **API client credentials**: the temporary credentials used for HPE GreenLake and each COM instance.
- **Workspace details**: workspace ID, name and organization.
- **COM regions**: the provisioned COM instances and their endpoints.
- **Identity provider details**: the SSO provider type (Okta, Entra ID or PingIdentity), when you sign in with SSO.

To view it, simply run:

```powershell
$HPEGreenLakeSession
```

## Session Lifetime

- Access tokens are valid for **2 hours** and are **refreshed automatically**, so long-running scripts keep working without re-authenticating.
- Sessions do not persist across PowerShell restarts.
- Run `Disconnect-HPEGL` when you are done: it revokes the tokens and removes the temporary API credentials.

## Working Across Several Workspaces

Use `Save-HPEGLSession` and `Restore-HPEGLSession` to switch between workspaces without signing in again:

```powershell
Connect-HPEGL -PasswordlessSSOEmail "user@company.com" -Workspace "Production"
$prodSession = Save-HPEGLSession

Connect-HPEGLWorkspace -Name "Development"   # Fast switch that reuses the existing tokens
$devSession = Save-HPEGLSession

Restore-HPEGLSession -Session $prodSession   # Switch back instantly
```

In long-running scripts, fall back to a full sign-in if a saved session can no longer be refreshed:

```powershell
try {
    Restore-HPEGLSession -Session $prodSession
}
catch {
    Connect-HPEGL -Credential $cred -Workspace "Production" | Out-Null
    $prodSession = Save-HPEGLSession
}
```

## Handy Global Variables

| Variable | What it holds |
|---|---|
| `$Global:HPEGreenLakeSession` | Tokens and session state, after `Connect-HPEGL` |
| `$Global:HPECOMRegions` | The COM regions available in the workspace |
| `$Global:HPECOMLastJobResult` | The full result of the last job cmdlet, useful when console output is truncated |
| `$Global:HPECOMInvokeReturnData` | The last raw API response, for debugging |

For example, after scheduling a job you can inspect the complete result with `$Global:HPECOMLastJobResult | Format-List`. All session variables are cleared by `Disconnect-HPEGL`.

> **Non-production (Pavo) environments**: the module also supports HPE's internal pre-production GreenLake environment (Pavo). Set `$env:HPE_COMMON_CLOUD_URL = "https://pavo.common.cloud.hpe.com"` before calling `Connect-HPEGL`, and the exact same cmdlets work unchanged — all endpoints, authentication, and regions are derived automatically.

For more details, refer to the help documentation of the `Connect-HPEGL` cmdlet:

```powershell
Get-Help Connect-HPEGL -Full
```

[↑ Back to Top](#)


# A Typical Server Lifecycle Workflow

The table below shows the main stages of managing servers with the library and the key cmdlets for each. Every stage links to the matching task of the [Zero-Touch Automation hands-on lab](https://hpelabs.github.io/PowerShell-COM-Zero-Touch/), where you can try it step by step.

| Stage | Key cmdlets | Try it in the lab |
|---|---|---|
| Set up the workspace and COM | `New-HPEGLWorkspace`, `New-HPEGLService`, `New-HPEGLLocation`, `New-HPEGLSubscription`, `Set-HPEGLDeviceAutoSubscription` | [Task 4](https://hpelabs.github.io/PowerShell-COM-Zero-Touch/#task-4---configuration-of-your-workspace) |
| Onboard servers | `New-HPECOMServerActivationKey`, `Connect-HPEGLDeviceComputeiLOtoCOM`, `Set-HPEGLDeviceLocation`, `Add-HPEGLDeviceTagToDevice` | [Task 5](https://hpelabs.github.io/PowerShell-COM-Zero-Touch/#task-5---onboarding-devices) |
| Define settings and groups | `New-HPECOMSettingServerBios`, `New-HPECOMSettingServerInternalStorage`, `New-HPECOMSettingServerFirmware`, `New-HPECOMSettingiLOSettings`, `New-HPECOMGroup`, `Add-HPECOMServerToGroup` | [Task 6](https://hpelabs.github.io/PowerShell-COM-Zero-Touch/#task-6---configuration-of-compute-ops-management) |
| Collect inventory | `New-HPECOMServerInventory`, `Get-HPECOMServerInventory` | [Task 7](https://hpelabs.github.io/PowerShell-COM-Zero-Touch/#task-7---gathering-comprehensive-server-inventory-information) |
| Monitor health, support and logs | `Get-HPECOMAlert`, `Get-HPECOMActivity`, `Get-HPECOMServerLogs`, `Enable-HPECOMEmailNotificationPolicy` | [Task 8](https://hpelabs.github.io/PowerShell-COM-Zero-Touch/#task-8---monitoring-server-health-support-and-warranty-status) |
| Keep firmware compliant | `Get-HPECOMGroup -ShowFirmwareCompliance`, `Update-HPECOMGroupServerFirmware`, `Get-HPECOMSchedule` | [Task 9](https://hpelabs.github.io/PowerShell-COM-Zero-Touch/#task-9---updating-and-ensuring-server-firmware-compliance) |
| Review insights and access iLOs | `Get-HPECOMServerUtilizationInsights`, `Get-HPECOMSustainabilityInsights`, `Get-HPECOMServeriLOSSO`, `Invoke-HPECOMGroupServeriLOConfiguration` | [Task 10](https://hpelabs.github.io/PowerShell-COM-Zero-Touch/#task-10---essential-next-steps-for-server-management-and-sustainability) |
| Clean up | `Remove-HPEGLDevice`, `Remove-HPEGLSubscription`, `Remove-HPEGLService`, `Remove-HPEGLWorkspace` | [Task 11](https://hpelabs.github.io/PowerShell-COM-Zero-Touch/#task-11---clean-up-your-workspace) |

Most cmdlets that change something support `-WhatIf`, so you can preview an action before running it.

For example, a single command shows how far each server in a group is from the group's firmware baseline, how many components need updating, whether the update will reboot the server, and the total download size:

```powershell
Get-HPECOMGroup -Region "eu-central" -Name "Production-Servers" -ShowFirmwareCompliance
```

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-17.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-17.png){:class="img-100pct"}{: data-lightbox="gallery"}{: .bordered-image-thin}

And sustainability reports give you the estimated energy consumption, CO2 emissions and energy cost of a server, or of every server in the instance, over the last 90 days:

```powershell
Get-HPECOMSustainabilityInsights -Region "eu-central" -SerialNumber "CZ12312312" -EnergyConsumption
```

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-18.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-18.png){:class="img-100pct"}{: data-lightbox="gallery"}{: .bordered-image-thin}

[↑ Back to Top](#)


# Onboarding Servers to Compute Ops Management

The library offers two complementary ways to connect server iLOs to Compute Ops Management:

| | `Connect-HPEGLDeviceComputeiLOtoCOM` | `Connect-HPECOMSecureGatewayDiscoveredServer` (v1.0.26+) |
|---|---|---|
| **Best for** | Any connection type, migrations, fine-grained control | Onboarding every iLO behind an HPE Secure Gateway at once |
| **Connection** | Direct, web proxy, or Secure Gateway | Secure Gateway only |
| **Input** | Known iLO IP addresses and credentials | Servers discovered by the Secure Gateway |
| **Activation key** | Generated by you with `New-HPECOMServerActivationKey` | Not needed |
| **iLO firmware** | Must already meet the COM minimum | Updated automatically when required |
| **DNS, NTP, subscription, location, tags** | Separate steps | Set in the same call |

**Connect a single iLO** (any connection type):

```powershell
$iLOCredential = Get-Credential
$activationKey = New-HPECOMServerActivationKey -Region "eu-central"

Connect-HPEGLDeviceComputeiLOtoCOM -IloIP "192.168.0.21" -IloCredential $iLOCredential `
    -ActivationKeyfromCOM $activationKey -SkipCertificateValidation
```

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-16.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-16.png){:class="img-100pct"}{: data-lightbox="gallery"}{: .bordered-image-thin}

> **Note**: `-SkipCertificateValidation` disables all certificate checks. Use it only with known iLOs that still have self-signed certificates.

**Discover and onboard every iLO behind a Secure Gateway** in one batch job:

```powershell
$iLOCredential = Get-Credential

Invoke-HPECOMSecureGatewayServerDiscovery -Region "eu-central" -SecureGateway "sg01.lab"

Get-HPECOMSecureGatewayServerDiscovery -Region "eu-central" -SecureGateway "sg01.lab" |
    Connect-HPECOMSecureGatewayDiscoveredServer -IloCredential $iLOCredential
```

Add `-WhatIf` to either cmdlet to preview what would happen without changing anything.

[↑ Back to Top](#)


# Script Samples

To help you get started quickly, here are three ready-to-use scripts that showcase the module in real-world scenarios.

## End-to-end zero-touch automation

The first is a complete end-to-end example: [COM-Zero-Touch-Automation.ps1](https://github.com/jullienl/HPE-COM-PowerShell-Library/blob/main/Examples/COM-Zero-Touch-Automation.ps1). It walks through the entire infrastructure deployment lifecycle — workspace creation, zero-touch server onboarding, configuration, firmware updates, and teardown. Task 12 of the [hands-on lab](https://hpelabs.github.io/PowerShell-COM-Zero-Touch/#task-12---explore-zero-touch-automation-with-the-sample-script-optional) shows you how to run it.

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-7.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-7.png){:class="img-100pct"}{: data-lightbox="gallery"}{: .bordered-image-thin} 

This script demonstrates a complete zero-touch automation workflow — from provisioning a workspace through onboarding, configuring, and finally tearing down the environment. It serves as both a learning tool and a production-ready template.

With HPE GreenLake:

- Authenticating to HPE GreenLake and provisioning a new workspace
- Inviting users and assigning workspace and organization roles
- Optionally joining the workspace to an organization for SSO and identity governance
- Enabling the Compute Ops Management service in a chosen region
- Creating physical locations and adding subscription keys with auto-subscription policies
- Saving and restoring the workspace session to speed up the cleanup phase

With HPE Compute Ops Management:

- Onboarding servers at scale by generating activation keys and connecting iLOs to COM
- Assigning device locations, tags, and service delivery contacts
- Creating BIOS, internal storage, firmware baseline, and iLO settings
- Building server groups with auto-apply policies and adding servers to them
- Enabling email notifications and scheduling group firmware updates
- Safely tearing down the test environment with comprehensive cleanup (removing devices, subscriptions, users, and the workspace)

Feel free to modify and expand upon this example to suit your specific needs. It is an excellent starting point for understanding the capabilities of the module and how to leverage it in your automation workflows.

## Bulk iLO onboarding to Compute Ops Management

The second is a production-grade onboarding script: [Prepare-and-Connect-iLOs-to-COM-v2.ps1](https://github.com/jullienl/HPE-Compute-Ops-Management/blob/main/PowerShell/Onboarding/Prepare-and-Connect-iLOs-to-COM-v2.ps1). It streamlines onboarding HPE Gen10 and later servers to Compute Ops Management by automating the iLO preparation and firmware-compliance work required for a successful connection. It pairs the `HPECOMCmdlets` module (for HPE GreenLake and COM) with the `HPEiLOCmdlets` module (for the iLOs themselves), and both modules are installed automatically if missing.

You feed it a CSV file of iLO IP addresses or hostnames — either sharing a single account or with per-device credentials — and it processes each server end to end:

- Authenticating to HPE GreenLake with either standard credentials or SSO, then validating the COM instance, Secure Gateway (if used), and that enough subscription licenses are available
- Configuring iLO DNS and SNTP settings so each iLO can reach the cloud and keep accurate time for the secure mTLS connection
- Updating iLO firmware when required to meet the COM minimums (iLO5 3.09+, iLO6 1.64+, iLO7 1.12.00+), including the special onboarding path for A55/A56 Gen11 platforms
- Generating a COM activation key and connecting each iLO to COM — directly, through a web proxy, or via a Secure Gateway
- Assigning a location and tags to every device, then verifying service and subscription assignments
- Exporting a detailed CSV status report summarising successes, warnings, skips, and failures for each server

The script is fully idempotent — it checks each setting before changing anything and skips servers that are already connected, so it is safe to re-run for ongoing management or troubleshooting. A `-Check` switch runs a non-destructive pre-flight assessment, reporting exactly what would change without touching any iLO. It is built for scale (up to 1000 servers per 24 hours) and keeps the HPE GreenLake session alive throughout long-running firmware operations.

## Discover and onboard iLOs via a Secure Gateway

The third, [Discover-and-Onboard-iLOs-via-SecureGateway.ps1](https://github.com/jullienl/HPE-Compute-Ops-Management/blob/main/PowerShell/Onboarding/Discover-and-Onboard-iLOs-via-SecureGateway.ps1) (v1.0.26+), is the Secure Gateway counterpart of the bulk onboarding script. The gateway discovers the iLOs on its network and updates their firmware itself, so you need **no CSV of IP addresses and no local firmware staging**:

- Authenticating to HPE GreenLake, then validating the COM instance, Secure Gateway, subscription and location
- Discovering every iLO behind the Secure Gateway and onboarding them in a single batch job
- Optionally setting iLO DNS and NTP, plus subscription, location, tags and service delivery contact
- Using one shared iLO credential, or per-iLO credentials from a CSV file
- A `-Check` pre-flight mode that sorts servers into Ready, Needs firmware update, or Skipped, and a CSV status report

[↑ Back to Top](#)


# Best Practices

HPE GreenLake APIs are rate limited. Most day-to-day use never hits the limits, but bulk operations and frequent scheduled scripts can. To stay well within them:

- **Retrieve once, reuse the results** instead of calling the API inside a loop:

    ```powershell
    # Good: one call, then filter locally as often as needed
    $servers = Get-HPECOMServer -Region "eu-central"
    $offline = $servers | Where-Object { -not $_.state.connected }
    ```

- **Prefer the cmdlet's own filter parameters**, so HPE GreenLake returns only what you need:

    ```powershell
    Get-HPECOMServer -Region "eu-central" -Model "ProLiant DL380 Gen10"
    ```

- **Back off and retry** with an increasing delay if you receive `429 (Too Many Requests)`.
- **Avoid very frequent schedules**: keep intervals of at least 5 to 10 minutes for recurring scripts.

See the README's [Best Practices](https://github.com/jullienl/HPE-COM-PowerShell-Library#best-practices--performance-considerations) section for a complete retry example.

[↑ Back to Top](#)


# Troubleshooting Common Sign-in Issues

- **"Maximum of 7 personal API clients exceeded"**: HPE GreenLake allows up to 7 active API credentials per user, and old ones accumulate when sessions are not closed. Add `-RemoveExistingCredentials` to `Connect-HPEGL` to clear them, and end your scripts with `Disconnect-HPEGL`.

    ```powershell
    Connect-HPEGL -Credential $cred -Workspace "Production" -RemoveExistingCredentials
    ```

- **"SSO configuration issue detected" or "Domain not configured for SSO"**: your email domain is not claimed, or the SSO connection or authentication policy is incomplete in HPE GreenLake. Check them with `Get-HPEGLDomain`, `Get-HPEGLSSOConnection` and `Get-HPEGLSSOAuthenticationPolicy`, and test SSO in a browser first.
- **MFA or identity provider errors** (push denied or timed out, authenticator not enrolled): the error message explains the cause and the fix for your provider.
- **Anything else**: add `-Verbose` to `Connect-HPEGL` to see each step of the sign-in. Sensitive values such as emails and tokens are masked, so the output can be shared when you ask for help.

[↑ Back to Top](#)


# Telemetry & Privacy

The module can send anonymous usage data to help guide its development. **Telemetry is off by default (opt-in)**: nothing is collected or sent unless you run `Enable-HPECOMDataCollection`.

- **Anonymous data only**: no personally identifiable information is ever collected — no usernames, email addresses, passwords, tokens, IP addresses, workspace names, or server names.
- **What is collected when you opt in**: one event per successful `Connect-HPEGL`, with values such as module version, PowerShell version and edition, operating system, authentication method, number of workspaces, active COM regions, and whether the session runs in a CI/CD pipeline.
- **Change your mind at any time**: run `Disable-HPECOMDataCollection` to stop, or set `$env:HPE_COM_NO_TELEMETRY = '1'` to turn it off for the current session only.

For full details, see the [Telemetry](https://github.com/jullienl/HPE-COM-PowerShell-Library#telemetry) section in the README.

[↑ Back to Top](#)


# Getting help

For more detailed information on each cmdlet and its usage, refer to the module's help documentation using:

```sh
Get-Help <CmdletName> -full
```

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-8.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-8.png){:class="img-900"}{: data-lightbox="gallery"}{: .bordered-image-thin} 

To see detailed examples of how to use a specific cmdlet, use the **Get-Help** cmdlet with the **\-Examples** parameter followed by the cmdlet name.

```sh
Get-Help <CmdletName> -Examples
```

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-9.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-9.png){:class="img-900"}{: data-lightbox="gallery"}{: .bordered-image-thin} 

To list all commands exported by the module, use:

```sh
Get-Command -Module HPECOMCmdlets
```

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-2.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-2.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin} 

To find cmdlets related to a specific resource, use:

```sh
Get-Command -Module HPECOMCmdlets | ? Name -match "<ResourceName>" 
# Example
Get-Command -Module HPECOMCmdlets | ? Name -match group
```

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-3.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-3.png){:class="img-700"}{: data-lightbox="gallery"}{: .bordered-image-thin} 

[↑ Back to Top](#)


# Support

HPECOMCmdlets is a **community-supported library** that I maintain as an HPE employee. It is not an official HPE product and is not covered by HPE commercial support agreements. Support is provided on a best-effort basis, and issues are typically reviewed within 1 to 3 business days.

- **Bug reports and feature requests**: open a [new issue](https://github.com/jullienl/HPE-COM-PowerShell-Library/issues). Please include the verbose output of `Connect-HPEGL` when reporting a sign-in problem.
- **Questions and ideas**: join the [GitHub Discussions](https://github.com/jullienl/HPE-COM-PowerShell-Library/discussions).
- **The HPE GreenLake platform or Compute Ops Management itself**: contact [HPE Support](https://support.hpe.com).


# Disclaimer

Please note that the HPE GreenLake APIs are subject to change. Such changes can impact the functionality of this library. We recommend keeping the library updated to the latest version to ensure compatibility with the latest API changes.


# Want more?

* [HPE Compute Ops Management Zero-Touch Automation hands-on lab](https://hpelabs.github.io/PowerShell-COM-Zero-Touch/) — learn the module step by step, from workspace creation to cleanup
* [HPECOMCmdlets README](https://github.com/jullienl/HPE-COM-PowerShell-Library/blob/main/README.md) — the complete, up-to-date library reference (authentication, examples, best practices, troubleshooting, telemetry)
* [Configuring SAML SSO with HPE GreenLake](https://jullienl.github.io/Configuring-SAML-SSO-with-HPE-GreenLake-and-Passwordless-Authentication-for-HPECOMCmdlets) and [Configuring OIDC SSO with HPE GreenLake](https://jullienl.github.io/Configuring-OIDC-SSO-with-HPE-GreenLake-for-HPECOMCmdlets/)
* [HPE GreenLake Edge-to-Cloud Platform User Guide](https://support.hpe.com/hpesc/public/docDisplay?docId=a00120892en_us)
* [HPE Compute Ops Management User Guide](https://www.hpe.com/info/com-ug)
* [HPE GreenLake Developer Portal](https://developer.greenlake.hpe.com/)

[↑ Back to Top](#)

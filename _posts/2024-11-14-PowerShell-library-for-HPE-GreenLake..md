---
layout: post
title:  "PowerShell Library for HPE Compute Ops Management"
categories: GreenLake
image: /assets/images/HPECOMCmdlets/header.jpg
excerpt: Discover how to automate and manage your HPE GreenLake and Compute Ops Management environment using PowerShell with the HPECOMCmdlets library.
last_modified_at: 2026-06-18
tags: 
  - greenlake
  - com 
---

The HPECOMCmdlets PowerShell library for HPE Compute Ops Management provides a robust set of cmdlets designed to manage and automate your HPE GreenLake environment efficiently. By leveraging this library, users can seamlessly interact with HPE GreenLake and Compute Ops Management services directly from the PowerShell command line, integrating effortlessly into existing automation workflows.

Since its first release, the library has grown considerably — adding SAML SSO with multiple identity providers, password-based and passwordless authentication, organization and access management, approval policies, webhooks, OneView/OVE appliance management, and much more. It is actively maintained, with new capabilities added as HPE releases them. See the [releases page](https://github.com/jullienl/HPE-COM-PowerShell-Library/releases) for the full history of what's new in each version.

Development is ongoing, and my efforts are far from finished. As we all know, SaaS cloud applications evolve over time. Therefore, this library will be continuously updated to incorporate new features as they are released by HPE.

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-1.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-1.png){:class="img-100pct"}{: data-lightbox="gallery"}{: .bordered-image-thin} 

This module is available in the [PowerShell Gallery](https://www.powershellgallery.com/packages/HPECOMCmdlets) under the name `HPECOMCmdlets`, following the naming convention used by most HPE modules.

> The PowerShell Gallery is a repository for sharing and distributing PowerShell modules and scripts. It's a community-driven platform that provides access to various PowerShell resources, enabling you to easily discover, install, and publish your own PowerShell content. The PowerShell Gallery can be accessed through the PowerShellGet module (includes **Install-Module**, **Find-Module**, etc.), which comes pre-installed with Windows PowerShell 5.0 and above.

This project is also associated with a new [repository](https://github.com/jullienl/HPE-COM-PowerShell-Library) on my GitHub account. 
This repository is where the source code is developed. You can also track [releases](https://github.com/jullienl/HPE-COM-PowerShell-Library/releases), report and view [issues](https://github.com/jullienl/HPE-COM-PowerShell-Library/issues), and participate in [discussions](https://github.com/jullienl/HPE-COM-PowerShell-Library/discussions).

> 📖 **The [README](https://github.com/jullienl/HPE-COM-PowerShell-Library/blob/main/README.md) is the most complete and up-to-date reference for the library** — covering supported authentication methods, the full identity-provider compatibility matrix, connection examples, global variables, best practices, troubleshooting, and telemetry. Whenever this blog and the README differ, the README is authoritative.

## Key Features

This library provides a variety of key features for managing HPE GreenLake and Compute Ops Management. Here are the main features:

- **Authentication**: Establish secure connections to HPE GreenLake using SAML Single Sign-On (SSO) — passwordless or password-based — with Okta, Microsoft Entra ID, and PingIdentity, or using HPE Account single/multi-factor authentication. Whether you have an existing workspace or not, the library supports flexible authentication methods to suit your needs.
- **Workspace & Organization Management**: Create and manage HPE GreenLake workspaces and organizations, including tenant workspaces, domains, SSO connections, and authentication policies.
- **Session Tracking**: Automatically track sessions with the global session tracker `$HPEGreenLakeSession`, and save/restore sessions for fast multi-workspace automation.
- **User & Access Management**: Invite and manage users, user groups, roles, and scope-based access control (SBAC) within your HPE GreenLake environment.
- **Resource Management**: Manage resources such as servers, storage, and networking within your HPE GreenLake environment.
- **Service Provisioning**: Provision services like Compute Ops Management, manage service roles and subscriptions.
- **Device Management**: Add devices individually or in bulk using CSV files, manage device subscriptions and auto-subscriptions, set device locations and connect devices to services. Devices can also be permanently removed (unclaimed) with `Remove-HPEGLDevice`.
- **Server Configuration Management**: Create and apply BIOS, storage, OS, and firmware settings. Manage groups and apply configurations to groups of servers.
- **Security and Compliance**: Manage iLO security settings and run inventory and compliance checks, including firmware, iLO settings, and external storage compliance.
- **Approval Policies**: Require explicit approval before sensitive operations (firmware updates, power actions, configuration changes) run against a group's servers.
- **Job Scheduling and Execution**: Schedule and execute various tasks like firmware updates, OS installations, and sustainability reports.
- **Notification and Integration**: Enable email notifications for service events and summaries, integrate with external services like ServiceNow, and deliver platform events to external endpoints using webhooks.
- **Appliance Management**: Add HPE OneView and Secure Gateway appliances, manage OneView/OVE appliance settings, server profile templates, and appliance group firmware updates.
- **Monitoring and Alerts**: Monitor alerts for your resources to ensure optimal performance and uptime.
- **Reporting**: Generate detailed reports on resource usage, performance, and other metrics.
- **Automation**: Automate repetitive tasks and workflows using PowerShell scripts and cmdlets.
- **Integration**: Seamlessly integrate with other tools and platforms using REST APIs and webhooks.
- **Security**: Implement security best practices and manage access control for your HPE GreenLake environment.

These features collectively provide a comprehensive set of cmdlets to manage various aspects of your HPE GreenLake environment and any existing Compute Ops Management service instances. 



## Requirements

The module requires **PowerShell 7.0 or later** and an HPE GreenLake account. For detailed system requirements and prerequisites, please refer to the [README.md](https://github.com/jullienl/HPE-COM-PowerShell-Library) file in the GitHub repository.

## Installation

To install the library, use the following command to download and install the module from the official PowerShell Gallery:

```powershell
Install-Module HPECOMCmdlets
```

Note: As a best practice, always install the newest release to get all the latest features and fixes.

If this is your first time installing a module from the PowerShell Gallery, you will be prompted to confirm whether you trust the repository. Type `Y` and press `Enter` to proceed.   

### Common Issues and Troubleshooting
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

By following these steps, you can successfully install the `HPECOMCmdlets` module and begin using it in your PowerShell 7 environment. (Note: while `Install-Module` ships with Windows PowerShell 5.1+, the module itself runs on **PowerShell 7.0 or later**.)

### How to Upgrade the Module

If you have already installed the module and need to update it to the latest version, run the following commands:

```powershell
Install-Module -Name HPECOMCmdlets -Force -AllowClobber
```
   
> **Note**: If you encounter permission issues during the upgrade process, run PowerShell as an administrator or use the `-Scope CurrentUser` parameter with the `Install-Module` cmdlet.

[⬆ Back to Top](#)


## Getting Started

### Using HPE Account Authentication (Single or Multi-Factor)

To connect using single or multi-factor authentication, follow these steps:

1. **Single-Factor Authentication**:

    Use the following command to connect with your email and password:

    ```powershell
    Connect-HPEGL -Credential (Get-Credential) -Workspace "YourWorkspaceName"
    ```

    [![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-4.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-4.png){:class="img-100pct"}{: data-lightbox="gallery"}{: .bordered-image-thin} 

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

            [![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-10.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-10.png){:class="img-100pct"}{: data-lightbox="gallery"}{: .bordered-image-thin} 

        - On your Okta-enabled device, press "Yes, it’s me" to approve the authentication request from **Okta Verify**.


            [![]({{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-11.png)]({{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-11.png){:class="img-300"}{: data-lightbox="gallery"}{: .bordered-image-thin}


    - When MFA is enabled with **Google Authenticator**:
       - The cmdlet will pause and prompt you to enter the MFA token.

            [![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-12.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-12.png){:class="img-100pct"}{: data-lightbox="gallery"}{: .bordered-image-thin} 

        - Open the **Google Authenticator** app on your device to retrieve the token and enter it when prompted.

            [![]({{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-15.png)]({{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-15.png){:class="img-300"}{: data-lightbox="gallery"}{: .bordered-image-thin}
         
### Using SAML Single Sign-On (SSO) with Okta, Microsoft Entra ID, or PingIdentity

The library supports SAML 2.0 Single Sign-On (SSO) with three identity providers: **Okta** (Okta Identity Engine — OIE only; Classic is not supported), **Microsoft Entra ID** (commercial cloud), and **PingIdentity** (PingOne SSO environment). Two sign-in modes are available depending on how your IdP account is configured:

- **Passwordless SSO** (`-PasswordlessSSOEmail`): no password is entered — you approve a push notification or enter a TOTP code.
- **Password-based SSO** (`-Credential`): you enter your federated password, and a second factor (push or TOTP) fires automatically if your IdP policy requires it. Because no interactive approval is needed when only a password is required, this mode — combined with a securely stored credential — enables truly unattended SSO automation.

In both modes, federation is detected automatically from your email domain — no additional parameters are required.

> **Note**: The `-SSOEmail` parameter was renamed to `-PasswordlessSSOEmail` in v1.0.26. The original `-SSOEmail` name still works as a backward-compatible alias.

> **Note on unsupported providers**: Identity providers other than Okta, Microsoft Entra ID, and PingIdentity (for example Google Workspace, OneLogin, Auth0, IBM Security Verify) are not supported for SSO, and OpenID Connect (OIDC) federation is not supported — only SAML 2.0. For these, sign in with native HPE Account credentials instead.

#### Passwordless SSO (`-PasswordlessSSOEmail`)

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

        [![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-13.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-13.png){:class="img-100pct"}{: data-lightbox="gallery"}{: .bordered-image-thin} 

    - Open your authenticator app and approve the request (for example, select the matching number) to complete the authentication process.

        [![]({{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-14.png)]({{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-14.png){:class="img-300"}{: data-lightbox="gallery"}{: .bordered-image-thin}

#### Password-based SSO (`-Credential`)

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

For a complete setup walkthrough, see the [Configuring SAML SSO with HPE GreenLake and Passwordless Authentication](https://jullienl.github.io/Configuring-SAML-SSO-with-HPE-GreenLake-and-Passwordless-Authentication-for-HPECOMCmdlets) guide. For detailed guidance on SSO with HPE GreenLake, refer to the [Authentication Guide](https://support.hpe.com/hpesc/public/docDisplay?docId=a00120892en_us&page=GUID-D7192971-EF71-4304-B51E-548E7954E644.html#ariaid-title1).



### Global Session Object: `$HPEGreenLakeSession`

Upon successful connection, the `Connect-HPEGL` cmdlet returns:

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-5.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-5.png){:class="img-100pct"}{: data-lightbox="gallery"}{: .bordered-image-thin} 

- A persistent session that is used for all subsequent cmdlet requests within the module.
- Temporary API client credentials for both HPE GreenLake and any Compute Ops Management service instances provisioned in the workspace.
- A global session object stored in the `$HPEGreenLakeSession` variable, which contains session details, API client credentials, access tokens, and other relevant information for interacting with HPE GreenLake and Compute Ops Management APIs.


[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-6.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-6.png){:class="img-100pct"}{: data-lightbox="gallery"}{: .bordered-image-thin} 

#### Key Properties of `$HPEGreenLakeSession`:

- **Access Tokens**: Temporary tokens used for authenticating API requests.
- **Workspace Details**: Information about the connected HPE GreenLake workspace.
- **Session Expiry**: The expiration time of the current session.
- **API Client Credentials**: Credentials used for API interactions.
- **User Information**: Details about the authenticated user.

#### Usage Example:

To view the details of the `$HPEGreenLakeSession` object, simply run:

```powershell
$HPEGreenLakeSession
```

This will display all the properties and their current values.

#### Managing Sessions:

- To disconnect and clear the session, use the `Disconnect-HPEGL` cmdlet.
- To refresh an expired session, re-run the `Connect-HPEGL` cmdlet with the appropriate credentials.
- For multi-workspace automation, use `Save-HPEGLSession` and `Restore-HPEGLSession` to switch between workspaces without re-authenticating.

> **Non-production (Pavo) environments**: the module also supports HPE's internal pre-production GreenLake environment (Pavo). Set `$env:HPE_COMMON_CLOUD_URL = "https://pavo.common.cloud.hpe.com"` before calling `Connect-HPEGL`, and the exact same cmdlets work unchanged — all endpoints, authentication, and regions are derived automatically.

For more details, refer to the help documentation of the `Connect-HPEGL` cmdlet:

```powershell
Get-Help Connect-HPEGL -Full
```

[⬆ Back to Top](#)



## Script Samples

To help you get started quickly, here are two ready-to-use scripts that showcase the module in real-world scenarios.

### End-to-end zero-touch automation

The first is a complete end-to-end example: [COM-Zero-Touch-Automation.ps1](https://github.com/jullienl/HPE-COM-PowerShell-Library/blob/main/Examples/COM-Zero-Touch-Automation.ps1). It walks through the entire infrastructure deployment lifecycle — workspace creation, zero-touch server onboarding, configuration, firmware updates, and teardown.

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

### Bulk iLO onboarding to Compute Ops Management

The second is a production-grade onboarding script: [Prepare-and-Connect-iLOs-to-COM-v2.ps1](https://github.com/jullienl/HPE-Compute-Ops-Management/blob/main/PowerShell/Onboarding/Prepare-and-Connect-iLOs-to-COM-v2.ps1). It streamlines onboarding HPE Gen10 and later servers to Compute Ops Management by automating the iLO preparation and firmware-compliance work required for a successful connection. It pairs the `HPECOMCmdlets` module (for HPE GreenLake and COM) with the `HPEiLOCmdlets` module (for the iLOs themselves), and both modules are installed automatically if missing.

You feed it a CSV file of iLO IP addresses or hostnames — either sharing a single account or with per-device credentials — and it processes each server end to end:

- Authenticating to HPE GreenLake with either standard credentials or SAML SSO, then validating the COM instance, Secure Gateway (if used), and that enough subscription licenses are available
- Configuring iLO DNS and SNTP settings so each iLO can reach the cloud and keep accurate time for the secure mTLS connection
- Updating iLO firmware when required to meet the COM minimums (iLO5 3.09+, iLO6 1.64+, iLO7 1.12.00+), including the special onboarding path for A55/A56 Gen11 platforms
- Generating a COM activation key and connecting each iLO to COM — directly, through a web proxy, or via a Secure Gateway
- Assigning a location and tags to every device, then verifying service and subscription assignments
- Exporting a detailed CSV status report summarising successes, warnings, skips, and failures for each server

The script is fully idempotent — it checks each setting before changing anything and skips servers that are already connected, so it is safe to re-run for ongoing management or troubleshooting. A `-Check` switch runs a non-destructive pre-flight assessment, reporting exactly what would change without touching any iLO. It is built for scale (up to 1000 servers per 24 hours) and keeps the HPE GreenLake session alive throughout long-running firmware operations.

[⬆ Back to Top](#)


## Telemetry & Privacy

Starting with v1.0.26, `Connect-HPEGL` sends a single **anonymous** usage event each time a successful connection is established. This lightweight telemetry helps guide development — focusing testing on the operating systems and PowerShell versions people actually run, measuring adoption of features like SSO, catching connection problems early, and gauging demand for currently-unsupported scenarios.

- **Anonymous data only**: no personally identifiable information is ever collected — no usernames, email addresses, passwords, tokens, IP addresses, workspace names, or server names. Nothing collected can be traced back to you or your organisation.
- **What is collected**: high-level, non-identifying values such as module version, PowerShell version/host/edition, operating system and version, authentication method, number of workspaces, active COM regions, connection duration, time zone, language, target environment, and whether the session runs in a CI/CD pipeline.
- **Fully opt-out**: to opt out permanently, run `Disable-HPECOMDataCollection`; to opt out for the current session only, set `$env:HPE_COM_NO_TELEMETRY = '1'`. You can re-enable collection at any time with `Enable-HPECOMDataCollection`.

For full details, see the [Telemetry](https://github.com/jullienl/HPE-COM-PowerShell-Library#telemetry) section in the README.

[⬆ Back to Top](#)


## Getting help

For more detailed information on each cmdlet and its usage, refer to the module's help documentation using:

```sh
Get-Help <CmdletName> -full
```

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-8.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-8.png){:class="img-100pct"}{: data-lightbox="gallery"}{: .bordered-image-thin} 

To see detailed examples of how to use a specific cmdlet, use the **Get-Help** cmdlet with the **\-Examples** parameter followed by the cmdlet name.

```sh
Get-Help <CmdletName> -Examples
```

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-9.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-9.png){:class="img-100pct"}{: data-lightbox="gallery"}{: .bordered-image-thin} 

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

[⬆ Back to Top](#)


## Support

If you encounter any issues or unexpected behavior, please open a [new issue](https://github.com/jullienl/HPE-COM-PowerShell-Library/issues) on my GitHub issue tracker for assistance.

For general questions or discussions that don't require tracking, join our [GitHub Discussions](https://github.com/jullienl/HPE-COM-PowerShell-Library/discussions).


## Disclaimer

Please note that the HPE GreenLake APIs are subject to change. Such changes can impact the functionality of this library. We recommend keeping the library updated to the latest version to ensure compatibility with the latest API changes.


## Want more?

* [HPECOMCmdlets README](https://github.com/jullienl/HPE-COM-PowerShell-Library/blob/main/README.md) — the complete, up-to-date library reference (authentication, examples, best practices, troubleshooting, telemetry)
* [HPE GreenLake Edge-to-Cloud Platform User Guide](https://support.hpe.com/hpesc/public/docDisplay?docId=a00120892en_us)
* [HPE Compute Ops Management User Guide](https://www.hpe.com/info/com-ug)
* [HPE GreenLake Developer Portal](https://developer.greenlake.hpe.com/)

[⬆ Back to Top](#)





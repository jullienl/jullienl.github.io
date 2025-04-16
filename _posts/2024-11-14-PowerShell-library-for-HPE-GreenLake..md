---
layout: post
title:  "PowerShell Library for HPE Compute Ops Management"
categories: GreenLake
image: /assets/images/HPECOMCmdlets/header.jpg
# excerpt: The purpose of this blog is to familiarize readers with the PowerShell library for the HPE GreenLake edge-to-cloud platform.
tags: COM Compute Ops Management
---

Update: Avril 2025

After long months of hard work, I am excited to announce the release of my new PowerShell library for HPE Compute Ops Management. This comprehensive library offers a robust set of cmdlets designed to manage and automate your HPE GreenLake environment efficiently. By leveraging this library, users can seamlessly interact with HPE GreenLake and Compute Ops Management services directly from the PowerShell command line, integrating effortlessly into existing automation workflows.

Development is ongoing, and my efforts are far from finished. As we all know, SaaS cloud applications evolve over time. Therefore, this library will be continuously updated to incorporate new features as they are released by HPE.

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-1.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-1.png){:class="body-image-post"}{: data-lightbox="gallery"} 

This module is available in the [PowerShell Gallery](https://www.powershellgallery.com/packages/HPECOMCmdlets) under the name `HPECOMCmdlets`, following the naming convention used by most HPE modules.

> The PowerShell Gallery is a repository for sharing and distributing PowerShell modules and scripts. It's a community-driven platform that provides access to various PowerShell resources, enabling you to easily discover, install, and publish your own PowerShell content. The PowerShell Gallery can be accessed through the PowerShellGet module (includes **Install-Module**, **Find-Module**, etc.), which comes pre-installed with Windows PowerShell 5.0 and above.

This project is also associated with a new [repository](https://github.com/jullienl/HPE-COM-PowerShell-Library) on my GitHub account. 
This repository is where the source code is developed. You can also track [releases](https://github.com/jullienl/HPE-COM-PowerShell-Library/releases), report and view [issues](https://github.com/jullienl/HPE-COM-PowerShell-Library/issues), and participate in [discussions](https://github.com/jullienl/HPE-COM-PowerShell-Library/discussions).

## Key Features

This library provides a variety of key features for managing HPE GreenLake and Compute Ops Management. Here are the main features:

- **Authentication**: Establish secure connections to HPE GreenLake using Single Sign-On (SSO) or single/multi-factor authentication. Whether you have an existing workspace or not, the library supports flexible authentication methods to suit your needs.
- **Workspace Management**: Create and manage HPE GreenLake workspaces.
- **Session Tracking**: Automatically track sessions with the global session tracker `$HPEGreenLakeSession`.
- **User Management**: Invite and manage users within your HPE GreenLake environment, assign roles.
- **Resource Management**: Manage resources such as servers, storage, and networking within your HPE GreenLake environment.
- **Service Provisioning**: Provision services like Compute Ops Management, manage service roles and subscriptions.
- **Device Management**: Add devices individually or in bulk using CSV files, manage device subscriptions and auto-subscriptions, set device locations and connect devices to services.
- **Server configuration Management**: Create and apply BIOS, storage, OS, and firmware settings. Manager group and apply configurations to groups of servers.
- **Security and Compliance**: Manage iLO security settings and run inventory and compliance checks.
- **Job Scheduling and Execution**: Schedule and execute various tasks like firmware updates, OS installations, and sustainability reports.
- **Notification and Integration**: Enable email notifications for service events and summaries, integrate with external services like ServiceNow.
- **Appliance Management**: Add HPE OneView and Secure Gateway appliances, upgrade HPE OneView appliances.
- **Monitoring and Alerts**: Monitor alerts for your resources to ensure optimal performance and uptime.
- **Reporting**: Generate detailed reports on resource usage, performance, and other metrics.
- **Automation**: Automate repetitive tasks and workflows using PowerShell scripts and cmdlets.
- **Integration**: Seamlessly integrate with other tools and platforms using REST APIs and webhooks.
- **Security**: Implement security best practices and manage access control for your HPE GreenLake environment.

These features collectively provide a comprehensive set of cmdlets to manage various aspects of your HPE GreenLake environment and any existing Compute Ops Management service instances. 



## Requirements

- **Supported PowerShell Version**: 7 or higher. 

    > **Note**: PowerShell version 5 is no longer supported. 

- **Supported PowerShell Editions**: PowerShell Core version 7 or higher.

    > **Note**: PowerShell Core is cross-platform and compatible with Windows, macOS, and Linux. 

    > **Note**: PowerShell Desktop (Windows PowerShell 5.1) is not supported.

- **HPE Account**: An HPE Account is necessary to connect to the HPE GreenLake platform and any Compute Ops Management services.
     
    > **Note**: If you do not have an HPE Account, you can create one [here](https://common.cloud.hpe.com). To learn how to create an HPE account, see [Getting started with HPE GreenLake](https://support.hpe.com/hpesc/public/docDisplay?docId=a001.0.122en_us&page=GUID-497192AA-FDC2-49C5-B572-0D2F58A23745.html)

    > **Note**: To interact with an HPE GreenLake workspace and a Compute Ops Management instance using this library, you must have at least the ***Observer*** role for both ***HPE GreenLake Platform*** and ***Compute Ops Management*** service managers. This role grants view-only privileges. For modification capabilities, you need either the ***Operator*** (view and edit privileges) or the ***Administrator*** (view, edit, and delete privileges) role. Alternatively, you can create a custom role that meets your specific access requirements.

- **Supported authentication methodes**:

    1. **Single-Factor Authentication**: Authenticate using your email and password.

    2. **Multi-Factor Authentication (MFA)**: Supported via **Google Authenticator** or **Okta Verify**.
        - **Requirements**:
            - Ensure the **Google Authenticator** or **Okta Verify** app is installed on your mobile device and linked to your account.
                - MFA with security keys or biometric authenticators is not supported. If your account is configured for these methods only, enable Google Authenticator or Okta Verify in your account settings.

        - **Behavior**:
            - For accounts with **Google Authenticator**, you will be prompted to enter the verification code.
            - For accounts with **Okta Verify**, approve the push notification on your Okta-enabled device.

                > Note: If both methods are enabled, the library defaults to **Okta Verify**.

    3. **SAML Single Sign-On (SSO)**: Supported exclusively with **Okta**.
        - **Requirements**:
            - Ensure that **Okta Verify** is properly installed and configured on your device. You must have an active Okta account linked to your email address to complete the authentication process successfully.

        - **Limitations**:
            - SAML SSO through other identity providers is not supported for direct authentication with the `Connect-HPEGL` cmdlet.
            - **Workaround**: Invite a user with an email address not associated with any SAML SSO domains configured in the workspace. This can be done via the HPE GreenLake GUI under **User Management** by selecting **Invite Users**. Assign the **HPE GreenLake Account Administrator** role to the invited user. Once the invitation is accepted, the user can set a password and use these credentials to log in with `Connect-HPEGL`.     


## Installation

To install the library, use the following command to download and install the module from the official PowerShell Gallery:

```powershell
Install-Module HPECOMCmdlets
```

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

By following these steps, you can successfully install the `HPECOMCmdlets` module and begin using it in your PowerShell 7 environment.

### How to Upgrade the Module

To ensure you are using the latest version of the `HPECOMCmdlets` module, follow these steps:

1. Uninstall all currently installed versions of the module:

    ```powershell
    Get-InstalledModule -Name HPECOMCmdlets -AllVersions | Uninstall-Module
    ```

2. Install the latest version from the PowerShell Gallery:

    ```powershell
    Install-Module HPECOMCmdlets
    ```

> **Note**: If you encounter permission issues during the upgrade process, run PowerShell as an administrator or use the `-Scope CurrentUser` parameter with the `Install-Module` cmdlet.


## Getting Started

### Using Single or Multi-Factor Authentication

To connect using single or multi-factor authentication, follow these steps:

1. **Single-Factor Authentication**:

    Use the following command to connect with your email and password:

    ```powershell
    Connect-HPEGL -Credential (Get-Credential) -Workspace "YourWorkspaceName"
    ```

    [![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-4.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-4.png){:class="body-image-post"}{: data-lightbox="gallery"} 

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

    > **Note**: MFA with security keys or biometric authenticators is not supported. If your account is configured for these methods only, enable Google Authenticator or Okta Verify in your account settings.

	- When MFA is enabled with **Okta**:
        - The cmdlet will prompt you to validate the push notification from **Okta Verify**.

            [![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-10.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-10.png){:class="body-image-post"}{: data-lightbox="gallery"} 

        - On your Okta-enabled device, press "Yes, it’s me" to approve the authentication request from **Okta Verify**.


            [![]({{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-11.png)]({{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-11.png){:class="iPhone-image-post"}{: data-lightbox="gallery"}


    - When MFA is enabled with **Google Authenticator**:
       - The cmdlet will pause and prompt you to enter the MFA token.

            [![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-12.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-12.png){:class="body-image-post"}{: data-lightbox="gallery"} 

        - Open the **Google Authenticator** app on your device to retrieve the token and enter it when prompted.

            [![]({{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-15.png)]({{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-15.png){:class="iPhone-image-post"}{: data-lightbox="gallery"}
         
### Using SAML Single Sign-On (SSO) with Okta

The library provides support for SAML Single Sign-On (SSO) exclusively with Okta. To ensure a successful authentication process, follow these steps:

1. **Install and Configure Okta Verify**:
    - Download and install the **Okta Verify** app on your device.

    - Link your Okta account to the app by following the setup instructions provided by your organization.

2. **Authentication Process**:
    - Use the following command to connect using SAML SSO with Okta:

      ```powershell
      Connect-HPEGL -SSOEmail "firstname.lastname@domain.com" -Workspace "YourWorkspaceName"
      ```

    - If you do not have a workspace yet, omit the `-Workspace` parameter. You can create a new workspace after your first connection using the `New-HPEGLWorkspace` cmdlet.

3. **Validation**:
    - During the connection process, you will be prompted to validate the push notification sent to your Okta Verify app.

        [![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-13.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-13.png){:class="body-image-post"}{: data-lightbox="gallery"} 

    - Open the **Okta Verify** app on your device and approve the authentication request by selecting the code provided to complete the authentication process.

        [![]({{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-14.png)]({{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-14.png){:class="iPhone-image-post"}{: data-lightbox="gallery"}

4. **Tips**:
    - Unsure of the workspace name? Connect without specifying the `-Workspace` parameter, then run `Get-HPEGLWorkspace` to list all available workspaces. Once identified, use `Connect-HPEGLWorkspace -Name "YourWorkspaceName"` to connect to the desired workspace.

For detailed guidance on setting up and using SAML Single Sign-On (SSO) with HPE GreenLake, refer to the [Authentication Guide](https://support.hpe.com/hpesc/public/docDisplay?docId=a00120892en_us&page=GUID-D7192971-EF71-4304-B51E-548E7954E644.html#ariaid-title1).



### Global Session Object: `$HPEGreenLakeSession`

Upon successful connection, the `Connect-HPEGL` cmdlet returns:

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-10.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-10.png){:class="body-image-post"}{: data-lightbox="gallery"} 

- A persistent session that is used for all subsequent cmdlet requests within the module.
- Temporary API client credentials for both HPE GreenLake and any Compute Ops Management service instances provisioned in the workspace.
- A global session object stored in the `$HPEGreenLakeSession` variable, which contains session details, API client credentials, access tokens, and other relevant information for interacting with HPE GreenLake and Compute Ops Management APIs.


[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-6.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-6.png){:class="body-image-post"}{: data-lightbox="gallery"} 

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

For more details, refer to the help documentation of the `Connect-HPEGL` cmdlet:

```powershell
Get-Help Connect-HPEGL -Full
```




## Script Samples

To help you get started quickly, I have provided a [sample script](https://github.com/jullienl/HPE-COM-PowerShell-Library/blob/main/Examples/sample.ps1). 

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-7.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-7.png){:class="body-image-post"}{: data-lightbox="gallery"} 

This file contains a variety of examples demonstrating how to use the different cmdlets available in the library to accomplish various tasks.

With HPE GreenLake:

- Setting up credentials and connecting to HPE GreenLake
- Configuring workspace, inviting new users and assigning roles
- Provisioning services and managing device subscriptions
- Adding devices individually or via CSV files

With HPE Compute Ops Management:

- Creating BIOS, internal storage, OS, and firmware settings.
- Managing group and adding servers to groups.
- Running inventory jobs and setting auto firmware updates.
- Powering on servers and updating firmware.
- Applying configurations and installing OS on servers.
- Generating sustainability reports and enabling email notifications.
- Adding external services like ServiceNow.
- Managing and upgrading HPE OneView and Secure Gateway appliances.

Feel free to modify and expand upon these examples to suit your specific needs. This file is an excellent starting point for understanding the capabilities of the module and how to leverage it in your automation workflows.


## Getting help

For more detailed information on each cmdlet and its usage, refer to the module's help documentation using:

```sh
Get-Help <CmdletName> -full
```

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-8.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-8.png){:class="body-image-post"}{: data-lightbox="gallery"} 

To see detailed examples of how to use a specific cmdlet, use the **Get-Help** cmdlet with the **\-Examples** parameter followed by the cmdlet name.

```sh
Get-Help <CmdletName> -Examples
```

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-9.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-9.png){:class="body-image-post"}{: data-lightbox="gallery"} 

To list all commands exported by the module, use:

```sh
Get-Command -Module HPECOMCmdlets
```

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-2.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-2.png){:class="body-image-post"}{: data-lightbox="gallery"} 

To find cmdlets related to a specific resource, use:

```sh
Get-Command -Module HPECOMCmdlets | ? Name -match "<ResourceName>" 
# Example
Get-Command -Module HPECOMCmdlets | ? Name -match group
```

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-3.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-3.png){:class="body-image-post"}{: data-lightbox="gallery"} 

## Support

If you encounter any issues or unexpected behavior, please open a [new issue](https://github.com/jullienl/HPE-COM-PowerShell-Library/issues) on my GitHub issue tracker for assistance.

For general questions or discussions that don't require tracking, join our [GitHub Discussions](https://github.com/jullienl/HPE-COM-PowerShell-Library/discussions).


## Disclaimer

Please note that the HPE GreenLake APIs are subject to change. Such changes can impact the functionality of this library. We recommend keeping the library updated to the latest version to ensure compatibility with the latest API changes.


## Want more?

* [HPE GreenLake Edge-to-Cloud Platform User Guide](https://support.hpe.com/hpesc/public/docDisplay?docId=a00120892en_us)
* [HPE Compute Ops Management User Guide](https://www.hpe.com/info/com-ug)
* [HPE GreenLake Developer Portal](https://developer.greenlake.hpe.com/)






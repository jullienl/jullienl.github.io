---
layout: post
title:  "PowerShell Library for HPE Compute Ops Management"
categories: GreenLake
image: /assets/images/HPECOMCmdlets/header.jpg
# excerpt: The purpose of this blog is to familiarize readers with the PowerShell library for the HPE GreenLake edge-to-cloud platform.
tags: COM Compute Ops Management
---


After long months of hard work, I am excited to announce the release of my new PowerShell library for HPE Compute Ops Management. This comprehensive library offers a robust set of cmdlets designed to manage and automate your HPE GreenLake environment efficiently. By leveraging this library, users can seamlessly interact with HPE GreenLake and Compute Ops Management services directly from the PowerShell command line, integrating effortlessly into existing automation workflows.

Development is ongoing, and my efforts are far from finished. As we all know, SaaS cloud applications evolve over time. Therefore, this library will be continuously updated to incorporate new features as they are released by HPE.

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-1.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-1.png){:class="body-image-post"}{: data-lightbox="gallery"} 

This module is available in the [PowerShell Gallery](https://www.powershellgallery.com/packages/HPECOMCmdlets) under the name `HPECOMCmdlets`, following the naming convention used by most HPE modules.

> The PowerShell Gallery is a repository for sharing and distributing PowerShell modules and scripts. It's a community-driven platform that provides access to various PowerShell resources, enabling you to easily discover, install, and publish your own PowerShell content. The PowerShell Gallery can be accessed through the PowerShellGet module (includes **Install-Module**, **Find-Module**, etc.), which comes pre-installed with Windows PowerShell 5.0 and above.

This project is also associated with a new [repository](https://github.com/jullienl/HPE-COM-PowerShell-Library) on my GitHub account. 
This repository is where the source code is developed. You can also track [releases](https://github.com/jullienl/HPE-COM-PowerShell-Library/releases), report and view [issues](https://github.com/jullienl/HPE-COM-PowerShell-Library/issues), and participate in [discussions](https://github.com/jullienl/HPE-COM-PowerShell-Library/discussions).

## Key Features

This library provides a variety of key features for managing HPE GreenLake and Compute Ops Management. Here are the main features:

- **Authentication**: Connect to HPE GreenLake using single-factor authentication with or without an existing workspace.
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

- **PowerShell Version**: 5.1 or higher
- **Supported PowerShell Editions**: Desktop, Core
- **HPE Account**: Required to connect to the HPE GreenLake platform and any Compute Ops Management services


> **Note**: If you do not have an HPE Account, you can create one [here](https://common.cloud.hpe.com). To learn how to create an HPE account, see [Getting started with HPE GreenLake](https://support.hpe.com/hpesc/public/docDisplay?docId=a00120892en_us&page=GUID-497192AA-FDC2-49C5-B572-0D2F58A23745.html).

> **Note**: To interact with an HPE GreenLake workspace and a Compute Ops Management instance, you must have at least the **Observer** role for both **HPE GreenLake Platform** and **Compute Ops Management** service managers. This role grants view-only privileges. For modification capabilities, you need either the **Operator** (view and edit privileges) or the **Administrator** (view, edit, and delete privileges) role. Alternatively, you can create a custom role that meets your specific access requirements.

> **Note**: The library supports only single-factor authentication. Multi-factor authentication (MFA) and SAML Single Sign-On are not supported. Users who use SAML Single Sign-On with HPE GreenLake cannot use their corporate email credentials when logging in via the `Connect-HPEGL` cmdlet. The workaround is to create a specific user in HPE GreenLake for this library. To do this, go to the HPE GreenLake GUI, click on `User Management` in the quick links panel and press the `Invite Users` button to send an invitation to a non-corporate email address. Once you receive the email, accept the invitation, and you will be directed to the HPE GreenLake interface to set a password. You can then use this email address and password to log in with `Connect-HPEGL`.

> **Note**: You do not need an existing HPE GreenLake workspace to connect. You can create a new workspace after your first connection using the `New-HPEGLWorkspace` cmdlet.


## Installation 

To install the library, download the module and import it into your PowerShell session:

```sh
Install-Module HPECOMCmdlets
```

This will download and install the module from the official PowerShell Gallery repository. If this is your first time installing a module from the PowerShell Gallery, it will ask you to confirm whether you trust the repository or not. You can type `Y` and press `Enter` to continue with the installation.

>**Note**: You must have an internet connection to install the module from the PowerShell Gallery. 

>**Note**: This library has no dependencies, so it does not require the installation of any other software or modules to function properly.

>**Note**: You may encounter several issues while using the `Install-Module` cmdlet in PowerShell, including:
>    * **Insufficient Permissions**: You might need administrative privileges to install modules. If you lack these privileges, run your PowerShell client as an administrator or use: `Install-Module HPECOMCmdlets -Scope CurrentUser`.
>    * **Blocked Security Protocols**: PowerShell's security settings can sometimes block the installation process, especially if the execution policy is set to `Restricted`. If `Get-ExecutionPolicy` returns `Restricted`, run `Set-ExecutionPolicy RemoteSigned` to change it.


## Getting Started

To get started, create a credentials object using your HPE GreenLake user's email and password and connect to your HPE GreenLake workspace:

```sh
$credentials = Get-Credential
Connect-HPEGL -Credential $credentials -Workspace "YourWorkspaceName"
```



If you don't have a workspace yet, use:

```sh
Connect-HPEGL -Credential $credentials 
```

If you have multiple workspaces assigned to your account and are unsure which one to connect to, use:

```sh
Connect-HPEGL -Credential $credentials 
# Get the list of workspaces
Get-HPEGLWorkspace 
# Connect to the workspace you want using the workspace name
Connect-HPEGLWorkspace -Name "<WorkspaceName>"
```

These commands establishe and manage your connection to the HPE GreenLake platform. 

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-4.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-4.png){:class="body-image-post"}{: data-lightbox="gallery"} 

Upon successful connection, it creates a persistent session for all subsequent module cmdlet requests. 

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-5.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-5.png){:class="body-image-post"}{: data-lightbox="gallery"} 

Additionally, the cmdlet generates temporary API client credentials for both HPE GreenLake and any Compute Ops Management service instances provisioned in the workspace.

The global variable `$HPEGreenLakeSession` stores session information, API client credentials, API access tokens, and other relevant details for both HPE GreenLake and Compute Ops Management APIs.

[![]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-6.png)]( {{ site.baseurl }}/assets/images/HPECOMCmdlets/HPECOMCmdlets-6.png){:class="body-image-post"}{: data-lightbox="gallery"} 

To learn more about this object, refer to the help documentation of `Connect-HPEGL`.

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






---
layout: post
title:  "New PowerShell library for the HPE GreenLake platform"
categories: GreenLake
image: /assets/images/PS-GLCP/POSH-Title.jpg
excerpt: The purpose of this blog is to familiarize readers with the PowerShell library for the HPE GreenLake edge-to-cloud platform.
tags: GreenLake GLCP PowerShell 
---


**Contents**   
[HPE GreenLake edge-to-cloud platform](#HPEGLCP)    
[Introduction to the HPE GreenLake PowerShell library](#Intro)   
[Getting started with the HPE GreenLake PowerShell library](#Gettingstarted)   
[Connection to the HPE GreenLake platform](#Connection)   
[Interaction with the HPE GreenLake API](#APIInteraction)   
&nbsp;&nbsp;&nbsp;[Main Cmdlets to manage workspaces](#WorkspaceCmdlets)   
&nbsp;&nbsp;&nbsp;[Main Cmdlets for roles, permissions, and restrictions](#RBACCmdlets)   
&nbsp;&nbsp;&nbsp;[Managing devices with the HPE GreenLake PowerShell library](#DeviceCmdlets)   
&nbsp;&nbsp;&nbsp;[Adding devices to the HPE GreenLake platform](#AddingDeviceCmdlets)   
&nbsp;&nbsp;&nbsp;[Managing applications with the HPE GreenLake PowerShell library](#ApplicationCmdlets)   
&nbsp;&nbsp;&nbsp;[Managing subscriptions with the HPE GreenLake PowerShell library](#SubscriptionCmdlets)   
&nbsp;&nbsp;&nbsp;[Main Cmdlets to manage a local gateway](#LocalGatewayCmdlets)   
[Summary](#Summary)   
[Want more?](#Wantmore)   
<br/>

The purpose of this blog is to introduce the new PowerShell library for the HPE GreenLake edge-to-cloud platform. Recently released, this library allows PowerShell developers, IT automation experts, and DevOps professionals to use the platform's APIs without having to rely on the GUI.

Anyone with basic PowerShell skills can now automate their interaction with HPE GreenLake, leverage the many resources offered by the platform, and enjoy increased productivity and efficiency.

<a name="HPEGLCP"></a>

# HPE GreenLake edge-to-cloud platform

The HPE GreenLake platform is a cutting-edge software-as-a-service platform that allows for seamless connectivity from the edge to the cloud. With this platform, you can expect a uniformly efficient and effective cloud experience for all your applications and data whether they are located on-premises or off-premises. The HPE GreenLake platform also provides valuable insights and controls that make it easy for you to manage your hybrid IT estate, complementing your existing use of public clouds and data centers.

![]( {{ site.baseurl }}/assets/images/PS-GLCP/PS-GLCP-00.png){:class="body-image-post"}

The HPE GreenLake platform is a secure cloud platform that utilizes HTTPS connection and certificate-based authentication. It comes with a rich set of APIs, which enable users to implement functionalities beyond those provided by the platform's graphical user interface. From streamlined configuration and deployment to device management, HPE GreenLake is perfect for new cloud users while also providing advanced users with powerful features and less administrative overhead.

HPE Compute Ops Management, HPE Data Services Cloud Console, HPE Aruba Central are the main SaaS-based consoles that can be onboarded from the HPE GreenLake platform to your HPE GreenLake workspace.  Each application offers different services and features for different types of HPE hardware. Designed to enable cloud operational agility for resources infrastructure everywhere but also to unify data operations across the resource lifecycle.

HPE Compute Ops Management is the SaaS-based console application for HPE servers, you can manage a long list of supported servers starting from Gen10 and simplify server operations, from the monitoring to the configuration and installation, you can get visibility into server health status, identify issues, automate tasks, updates servers, and so on.

HPE Data Services Cloud Console, is the SaaS-based console for your data, you can manage HPE Storage devices such as HPE Alletra and HPE Nimble Storage. And finally, Aruba Central being the SaaS application for all HPE network devices.

It is worth noting that HPE GreenLake offers a platform with a common set of cloud services for all these application instances and different services. This common service experience brings together all HPE service offerings into a single, comprehensive customer experience that this library leverages. 


![]( {{ site.baseurl }}/assets/images/PS-GLCP/PS-GLCP-01.png){:class="body-image-post"}



HPE GreenLake CCS, short for HPE GreenLake Common Cloud Services, offers a collection of API-enabled services that serve various functions, with the primary ones being:

* **Registration**: in charge of the user registration. Includes email verification, workspace creation with HPE GreenLake platform's Identity Provider (IdP) including integration with Ping Identity as the OpenID Connect (OIDC) Relying Party (RP) provider for user authenticity verification and token issuance
* **Authentication (AuthN)**: takes care of the user authentication and HPE GreenLake CCS to applications authentication. Includes unified login, Single or Multi-factor authentication (MFA) or Single sign-on (SSO) with third party, federated authentication with customer’s identity DP, single logout, user management, and supports increased security with PKCE (Proof Key for Code Exchange, pronounced ‘pixy”) for OAuth 2.0 
* **Authorization (AuthZ)**: provides authorization service for HPE GreenLake CCS. Includes unified Role-Based Access Control (RBAC) for users, custom roles and Resource Restriction Policy (RRP) including role creation, resource assignment to a role, role assignment to user, etc.
* **Device activation and inventory**: provides Zero Touch Provisioning (ZTP) and Asset inventory (contract and customer order processing). Includes device firmware management (firmware repository for resources, latest FW check, FW upgrade, baseline upgrade)
* **Subscription management**: offers subscription inventory, support for different consumption models


![]( {{ site.baseurl }}/assets/images/PS-GLCP/PS-GLCP-02.png){:class="body-image-post"}


The majority of these essential functions can be performed using the HPE GreenLake PowerShell library, which includes tasks such as workspace and user creation, role and permission assignment, device integration, tagging, application assignment and subscription definition.

PowerShell offers numerous benefits, such as its flexibility and ease of learning, and with this new library, you can significantly boost your productivity, be agile while reducing the risk of manual errors. Most. if not all, of the HPE GreenLake tasks can be automated in a smarter way, making it a must-have tool for any IT automation engineer or DevOps personnel.

<a name="Intro"></a>


# Introduction to the HPE GreenLake PowerShell library

The new HPE GreenLake PowerShell library can be found on the Hewlett Packard Enterprise GitHub repository at [https://github.com/HewlettPackard/POSH-HPEGreenLake](https://github.com/HewlettPackard/POSH-HPEGreenLake).    

![]( {{ site.baseurl }}/assets/images/PS-GLCP/PS-GLCP-03.png){:class="body-image-post"}

This module is also published in the [PowerShell Gallery](https://www.powershellgallery.com/packages/HPEGreenLake). The PowerShell Gallery is a repository for sharing and distributing PowerShell modules and scripts. It's a community-driven platform that provides access to various PowerShell resources, enabling you to easily discover, install, and publish your own PowerShell content. The PowerShell Gallery can be accessed through the PowerShellGet module (includes **Install-Module**, **Find-Module**, etc.), which comes pre-installed with Windows PowerShell 5.0 and above.

In most GitHub repositories, the **README.md** file is a crucial file that provides essential information about the project. It typically contains instructions on how to install and use the module, as well as any other important details that potential users or contributors may need to know. Other files and folders in the repository include source code, documentation, configuration files, samples, and more. These files are organized into different directories to help keep things organized and easy to find. As mentioned, the **README.md** file is an excellent starting point for getting familiar with this new module. 

The **Samples** folder provides several scripts and csv file examples to demonstrate how this library can be best used. These examples illustrate the variety of functionality in the library, including connecting to the platform, onboarding devices, generating API credentials, interacting with iLO, etc.

The **[Issues](https://github.com/HewlettPackard/POSH-HPEGreenLake/issues)** tab is a feature commonly found on websites that use version control systems such as Git, GitHub, or Bitbucket. It allows users to report issues, request new features, or provide feedback related to a project. When users click on one of the **Get Started** buttons, they are redirected to a form where they can enter details about their issue or suggestion. This information is then stored as a new issue in the project's issue tracker, where developers can see it and take action accordingly. The **Issues** tab is a valuable tool for effective communication between developers and users, allowing for a more transparent and collaborative development process.  

![]( {{ site.baseurl }}/assets/images/PS-GLCP/PS-GLCP-04.png){:class="body-image-post"}

<a name="Gettingstarted"></a>


# Getting started with the HPE GreenLake PowerShell library

**Install-Module** cmdlet is a common way to install PowerShell modules from online repositories. The cmdlet downloads and installs the module and any associated dependencies that it may have. To use the **Install-Module** cmdlet, you can simply open a PowerShell console (or a PowerShell ISE or VS Code console), and run the following command:

```powershell
Install-Module HPEGreenLake
```
> **Note**: This new library provides support for two editions of PowerShell: Desktop (version 5.1 and above) and Core (version 7.x, available on Windows, Linux, and Mac operating systems).


This will download and install the module from the official PowerShell Gallery repository. If this is your first time installing a module from the PowerShell Gallery, it will ask you to confirm whether you trust the repository or not. You can type **Y** and press **Enter** to continue with the installation.

> **Note**: You must have an internet connection to install the module from the PowerShell Gallery.  
>
> **Note**: At the time of writing this blog, the HPE GreenLake PowerShell library has no dependencies. In other words, the library does not require the installation of any other software or modules to function properly.

There could be several issues you may encounter while using the **Install-Module** cmdlet in PowerShell, some of which are:

* **Insufficient permissions**: You may need administrative privileges to install modules. If you do not have sufficient privileges, you can run your PowerShell client as an administrator or use: **Install-Module HPEGreenLake -Scope CurrentUser**
  
* **Blocked security protocols**: Sometimes, the security protocols built into PowerShell can prevent the installation process. This usually happens when the PowerShell execution policy is set to "Restricted". If **Get-ExecutionPolicy** shows Restricted, you may need to run **Set-ExecutionPolicy RemoteSigned**


Once the HPE GreenLake module is installed, you can get the list of commands exported by the module using the **Get-Command** cmdlet:

```powershell
Get-Command -Module HPEGreenLake
```

At the time of writing this blog, there are around 60 cmdlets available with the HPE GreenLake module. The table below describes the main resources and features that are supported:

![]( {{ site.baseurl }}/assets/images/PS-GLCP/PS-GLCP-05.png){:class="body-image-post"}

In PowerShell, cmdlet names are constructed using a verb-noun format. The verb describes the action that the cmdlet performs (*Get*, *Set*, *Remove*, *Invoke*, etc.), and the noun specifies the object that the cmdlet acts upon. For example, the **Get-HPEGLUserRole** retrieves information about the user role in the HPE GreenLake platform. Note that object resource with this library always starts with **HPEGL\<resource_name\>** (GL for GreenLake). 

**Get-Help** is an important cmdlet in PowerShell as it provides detailed information about a specific cmdlet or function. To get the full help details for the **Get-HPEGLUserRole** cmdlet, you can use the following command:

```powershell
Get-Help Get-HPEGLUserRole -Full
```
![]( {{ site.baseurl }}/assets/images/PS-GLCP/PS-GLCP-05-00.png){:class="body-image-post"}


To view the detailed examples of how to use a particular cmdlet, you can use the **Get-Help** cmdlet along with the **\-Examples** parameter followed by the name of the cmdlet. Here's an example command that you can use to get the examples of **Get-HPEGLUserRole** cmdlet:

```powershell
Get-Help Get-HPEGLUserRole -Examples
```
![]( {{ site.baseurl }}/assets/images/PS-GLCP/PS-GLCP-05-01.png){:class="body-image-post"}

This will display all the available examples for the **Get-HPEGLUserRole** cmdlet in a list format. You can review the examples and use them according to your requirements.

Note that you can get a comprehensive list of all cmdlets within the module that are applicable to the  *workspace* resource using the following command:
```powershell
Get-Command -Module HPEGreenLake | ? name -match workspace
```

![]( {{ site.baseurl }}/assets/images/PS-GLCP/PS-GLCP-05-02.png){:class="body-image-post"}

Six cmdlets are currently available.

<a name="Connection"></a>


# Connection to the HPE GreenLake platform

The connection to the HPE GreenLake platform is done using the **Connect-HPEGL** cmdlet.

>**Note**: The library currently only supports single-factor authentication. Multi-factor authentication (MFA) and SAML Single Sign-On are not supported. 

>**Note**: This limitation means that users who use SAML single sign-on with the HPE GreenLake platform (this applies to all HPE employees) cannot use their corporate email credentials when logging in via the **Connect-HPEGL** cmdlet. 

> **Note**: While waiting for SAML Single Sign-On support, the temporary solution is to add a secondary email into your HPE GreenLake workspace. Just go to the HPE GreenLake GUI and use the **Invite Users** card in **Manage** / **Identity & Access** to send an invitation to a non-corporate email address. Once you receive the email, accept the invitation and you will be directed to the HPE GreenLake interface where you can set a password. Once this is done, you can use this email address and password to log in with **Connect-HPEGL**.

> **Note**: To interact with the HPE GreenLake platform through this library, you must possess at least the ***Observer*** built-in role in the ***HPE GreenLake platform*** application. This role only grants view privileges. However, if you need to make modifications, then either the ***Operator*** (with view and edit privileges) or the ***Administrator*** (with view, edit, and delete privileges) built-in roles are necessary. If none of these built-in roles are suitable, you can also create your own custom role that meets your role-based access control requirements.

To begin with, it is recommended that you create a credentials object that includes your HPE GreenLake user's email and password:

```powershell
$GLCP_userName = "Username@domain.com"  
$GLCP_password = "xxxxxxxxxxxxxxxx"  
$secpasswd = ConvertTo-SecureString -String $GLCP_password -AsPlainText -Force  
$credentials = New-Object System.Management.Automation.PSCredential ($GLCP_userName, $secpasswd)  
```

Then using the **Connect-HPEGL** cmdlet, you can connect to the platform:

```powershell
Connect-HPEGL -Credential $credentials
```

If you have multiple workspaces, you can add the **\-Workspace** parameter to connect to the appropriate workspace name as follows:

```powershell
Connect-HPEGL -Credential $credentials -Workspace "HPE Mougins"
``` 

After successfully authenticating to the HPE GreenLake platform, the *[HPEGreenLake.Connection]* object is returned to the caller and (at the same time) is added to the global session tracker **$HPEGreenLakeSession**.

![]( {{ site.baseurl }}/assets/images/PS-GLCP/PS-GLCP-06.png){:class="body-image-post"}


To display the full content of this global variable in the console, use: 

```powershell
$HPEGreenLakeSession | format-List
```

![]( {{ site.baseurl }}/assets/images/PS-GLCP/PS-GLCP-07.png){:class="body-image-post"}

This object contains the following properties:

* **session**: Web session object containing information about the HPE GreenLake session, including cookies and credentials
* **oauth2AccessToken**: OAuth2 access token string returned by the API after successful authentication
* **oauth2IdToken**: OAuth2 ID token string returned by the API after successful authentication
* **oauth2RefreshToken**: OAuth2 refresh token string returned by the API after successful authentication
* **userName**: Email address that was authenticated with HPE GreenLake
* **workspaceId**: ID of the HPE GreenLake workspace
* **workspace**: Name of the HPE GreenLake workspace 
* **oauth2TokenCreation**: OAuth2 token creation datetime value
* **oauth2TokenCreationEpoch**: Unix time since creation of the OAuth2 token
* **userSessionIdleTimeout**: HPE GreenLake user session timeout in minutes
* **apiCredentials**: Collection of application API credentials created during the session

Each API credential object contains the following properties:

* **credential_name**: Name of the API credential
* **application_name**: Name of the application using this credential
* **ccs_region**: Region of the application using this credential
* **application\_instance\_id**: Instance ID of the application using this credential
* **client_id**: Client ID of the API credential
* **client_secret**: Client Secret of the API credential
* **connectivity_endpoint**: Connectivity endpoint of the application instance

The **apiCredentials** property is only filled in when using **New-HPEGLAPIcredential** during a session. 

All properties in this object are important. **Session** stores what the library uses to make all the calls in the cmdlets. You can open a session using:

```powershell
$HPEGreenLakeSession.session
```

The output is as follows:

![]( {{ site.baseurl }}/assets/images/PS-GLCP/PS-GLCP-08.png){:class="body-image-post"}


Note that in the headers, an **Authorization, Bearer \<token\>** header is defined. 

This token is a JSON Web Token (JWT). Pronounced "Jot", this type of token is used in the OAuth 2.0 standard for authentication and authorization purposes with the HPE GreenLake platform. OAuth 2.0 is a secure and standardized authorization framework designed to enable third-party applications to access resources and data without the need for the user to reveal their login credentials to the third-party application or API. 

The JWT typically contains data about the token (such as its type and signature algorithm), statements about the user (such as their ID, name, email address, or role) and an expiration time. Finally, it includes a signature that is used to verify that the token has not been altered during transmission and that it was issued by a trusted source.

It's important to keep in mind that the access token will only be valid for a period of 2 hours, after which it will expire and no longer be usable. Note that the library has a built-in function that runs in the background to refresh the access token before it expires. The function is triggered whenever a cmdlet is executed. However, if your session has already expired due to prolonged inactivity (defined by the session timeout in the HPE GreenLake user preferences) you will need to reconnect to the platform with **Connect-HPEGL**.

The **Connect-HPEGL** cmdlet handles the entire authorization process, which includes authorizing with the third-party identity provider and collecting various tokens. Once all the necessary tokens have been obtained, a session is created by utilizing bearer authentication with the HPE GreenLake platform Authentication (AuthN) service API using the *id_token* present in the payload to confirm your identity.

When the session is created, CCS sets a unique session ID in a cookie that the library stores in **$HPEGreenLakeSession.session.cookies** so that all subsequent requests can use it. Other cookies are also added to maintain the session state between the PowerShell session and the AuthN service API. For each request from the HPE GreenLake library, these cookies are sent back to the CCS API, which allows the cloud platform to identify the user and grant various permissions.

<a name="APIInteraction"></a>


# Interaction with the HPE GreenLake API

<a name="WorkspaceCmdlets"></a>


## Main Cmdlets to manage workspaces

In HPE GreenLake, you have the ability to view details and manage your company workspace information. The main cmdlets for managing workspaces are as follows:
 * **Get-HPEGLWorkspace**: to get company workspace information
 * **New-HPEGLWorkspace** to create a new workspace
 * **Set-HPEGLWorkspaceDetails** to define your workspace’s details including name, address, phone number, email, etc.
 * **Remove-HPEGLWorkspaceDetails** to delete some workspace’s details
 * **Use-HPEGLWorkspace** to switch from the current workspace to another workspace.
 * **Use-HPEGLWorkspace** to switch from the current workspace to another workspace.
 * **Use-HPEGLWorkspace** to switch from the current workspace to another workspace.
  

<a name="RBACCmdlets"></a>


## Main Cmdlets for roles, permissions, and restrictions

In HPE GreenLake, you have the ability to manage users and their permissions to services and resources within your workspace. The management of these permissions is done through Roles which are composed of a set of permissions that provide access to users in your HPE GreenLake workspace. 

Additionally, you can restrict access to specific resources by creating custom resource groupings using Resource Restriction Policies.

The main cmdlets for managing users and their access to HPE GreenLake resources are as follows:

* To manage users: 
  * **Get-HPEGLUser**: to get users and their activity status and roles
  * **Send-HPEGLUserInvitation**: to invite users to your workspace
  * **Remove-HPEGLUser**: to delete users from your workspace
<br/>
<br/>
  
* To view and manage user roles and permissions: 
  * **Get-HPEGLRole**: to view the role (= group of permissions) that you can specify and assign to users in your HPE GreenLake workspace
  * **Get-HPEGLUserRole**: to view user roles and permissions 
  * **Set-HPEGLUserRole**: to set user roles and permissions
  * **Remove-HPEGLUserRole**: to remove user roles and permissions 
<br/>
<br/>

* To define Resource Restriction Policies and manage access to resources:
  * **Get-HPEGLResourceRestrictionPolicy**: to view resource restriction policies in your workspace
  * **New-HPEGLResourceRestrictionPolicy**: to set resource restriction policies in your workspace
  * **Remove-HPEGLResourceRestrictionPolicy**: to remove resource restriction policies in your workspace


<a name="DeviceCmdlets"></a>


## Managing devices with the HPE GreenLake PowerShell library

In HPE GreenLake, devices are the resource for compute, network and storage devices that you can onboard on the platform in your HPE GreenLake workspace. Once onboarded, devices can be viewed, assigned to an application instance, applied to a subscription, and tagged.

In the library, the main cmdlet to get information on devices is **Get-HPEGLDevice**.

```powershell
Get-HPEGLdevice
```

As in the GUI, the bare cmdlet (without parameters) returns a subset of resources in a page. A maximum of 100 devices are displayed by default. The **\-Nolimit** parameter can be used to display all available devices, but this may result in a longer response time. 

The cmdlets in this library usually generate formatted objects when they are displayed on the console to enhance readability and ease of understanding. As an example, if you enter:

```powershell
Get-HPEGLdevice -Limit 10
``` 

![]( {{ site.baseurl }}/assets/images/PS-GLCP/PS-GLCP-09.png){:class="body-image-post"}


The generated output is "formatted". To get the full view of a formatted object in PowerShell, you can use the **Format-List** cmdlet (or **fl** its alias). This cmdlet allows you to display all the properties and values of an object in a list form:

```powershell
Get-HPEGLdevice -Limit 10 | fl
```


![]( {{ site.baseurl }}/assets/images/PS-GLCP/PS-GLCP-10.png){:class="body-image-post"}


Several other parameters are available such as *Tags*, *Archived*, *Stats*, *Devicetype*, *Serialnumber*, etc. You can use the help to get the complete list, and try them out at your convenience.

<a name="AddingDeviceCmdlets"></a>


## Adding devices to the HPE GreenLake platform

To manage devices using HPE GreenLake, one of the initial steps is to onboard the device onto the platform. When using the GUI, this step is typically done manually. One of the major advantages of using a library that supports automation is the ability to streamline and fully automate processes such as device onboarding. With automation, you can significantly increase efficiency, reduce errors, and save time and resources that would otherwise be spent on manual tasks.

The process of onboarding devices on the platform actually requires several steps that must first be performed on the HPE GreenLake platform side. Here are the different steps and commands that need to be executed:

![]( {{ site.baseurl }}/assets/images/PS-GLCP/PS-GLCP-11.png){:class="body-image-post"}


**Add-HPEGLDeviceCompute** is the first cmdlet that you can use to simply add a Compute device to the HPE GreenLake console.  The sole purpose of this cmdlet is to add compute(s) with the specified tags to the platform and nothing beyond that. The corresponding cmdlets for adding storage and network devices are **Add-HPEGLDeviceStorage** and **Add-HPEGLDeviceNetwork**.

It is worth noting that a CSV file can be utilized to add multiple devices to the platform by containing device information such as serial number, part number, subscription key, MAC address and tags depending on the type of device you wish to add. You can use this CSV file as an input for the pipeline of these cmdlets, as in this example with **Add-HPEGLDeviceCompute**:

```powershell
Import-Csv Compute_Devices.csv | Add-HPEGLDeviceCompute
```

In this case, the content of the csv file to define the Compute must use the following format:

*SerialNumber, PartNumber, Tags*  
*WGX2380BLC, P55181-B21, Country=US State=PACA App=RH*  
*AZX2380BLD, P55182-B21, State=Texas Role=production*  
*7LKY23D9LM, P54277-B21*

Note that for 7LKY23D9LM, no tag is assigned in this example.

Tags are optional with Compute but highly recommended. They are particularly useful when creating resource restriction policies. They must meet the string format: "**\<Name\>=\<Value\> \<Name\>=\<Value\>**" such as "**Country=US State=TX App=Grafana**" or "**Country=US**".

**Add-HPEGLDeviceComputeFullService** is a much more advanced cmdlet than the previous one. This specific command has the ability to perform all mandatory steps of Compute onboarding, including both the HPE GreenLake platform side and server side procedures, as described in the following diagram:

![]( {{ site.baseurl }}/assets/images/PS-GLCP/PS-GLCP-12.png){:class="body-image-post"}


A single command is sufficient to implement the entire onboarding process. The steps include:

1. Connect to HPE GreenLake using the default workspace or the one provided using the **\-GLWorkspace** parameter.
2. Set the automatic assignment of subscriptions with the first Compute Enhanced subscription found that has not expired and has available subscription seats.
3. Onboard each device to the HPE GreenLake platform workspace.      
4. Set optional server tags if defined with the **\-Tags** parameter.
5. Associate each device with the defined application instance (subscription is automatically assigned to each device as per auto assignment configuration).
6. Set each iLO to use a web proxy if defined via the different web proxy parameters.
7. Connect each iLO to the HPE Compute Ops Management instance.

> **Note**: This cmdlet is involved in the configuration of iLOs so the prerequisite for running this cmdlet is to have network access to both the Internet (to access the HPE GreenLake platform) and the iLO network (which is usually a private network).

This time, the content of the csv file should contain information regarding iLOs which includes their IP addresses, login credentials (an administrator account is a requisite), and tags (if applicable). This is the only data needed to feed the pipeline. The format should be as follows:

*IP, Username, Password, Tags*  
*192.168.3.193, Administrator, password, Country=FR City=Mougins App=InfluxDB Owner=LJ*  
*192.168.3.191, Administrator, password, Country=US State=Texas Role=Production Owner=LJ*  
*192.168.3.205, demo, password*

All Compute data that is required by the HPE GreenLake platform to complete the Compute onboarding is collected and managed by the cmdlet in the background using RedFish iLO calls. 

You can use **Get-Help** to learn more about this cmdlet and particularly look at the different examples:

```powershell
Help Add-HPEGLDeviceComputeFullService -full
```

**Add-HPEGLDeviceStorageFullService** and **Add-HPEGLDeviceNetworkFullService** offer the same full onboarding service for storage and networking devices. 

Overall, the ability to fully automate device onboarding is a significant advantage that can lead to many benefits for organizations of all sizes.

Note that there are [samples](https://github.com/HewlettPackard/POSH-HPEGreenLake/tree/master/Samples) available on GitHub repository that can help in learning how to use the full device onboarding cmdlets and how to build a csv file for each device type.

<a name="ApplicationCmdlets"></a>


## Managing applications with the HPE GreenLake PowerShell library

The main cmdlets for managing applications in the HPE GreenLake platform are the followings:

* To manage applications: 
  
  * **Get-HPEGLApplication**: to get all applications available to you on your HPE GreenLake platform, including the ones that are provisioned into your workspace and the ones that are not 
<br/>
<br/>
  
* To add and remove applications:
  
  * **Add-HPEGLApplication**: to provision an application in a new region
<br/>
<br/>
   > **Note**: A HPE GreenLake region refers to the geographical location where the HPE GreenLake services are hosted and provided from. This can vary depending on the customer's location and which HPE GreenLake application you are using. Customers can choose the region that best suits their needs in terms of location, availability, and compliance requirements.

  * **Remove-HPEGLApplication**: to delete an application instance 
<br/>
<br/>
  > **Note**: This cmdlet has a high-impact and irreversible action. This action permanently deletes all data of the application instance and cannot be undone once the process has started. For example, removing the Compute Ops Management US-West instance would remove all user data, all devices, all server settings, all server groups, all API credentials, etc. It's great to hear that this cmdlet has a confirmation prompt before deleting an application instance. This feature can help prevent accidental deletions and provide an extra layer of protection for critical data in applications.

* To assign and unassign devices to applications:
  
  * **Set-HPEGLDeviceApplication**: to attach devices to an application instance
<br/>
<br/>
  > **Note**: Assigning devices to an application instance is the process of attaching devices to an application in a region, so that these devices become visible and managed in the application instance by users.

* To create and delete API application credentials:
  
  * **New-HPEGLAPIcredential**: to create an API credential for an application instance 
<br/>
<br/>
  > **Note**: With the HPE GreenLake platform, developers can make API calls on any application instance as long as they have the API credentials, which consist of a client ID, client secret and connectivity endpoint. 
  >
  > **Note**: When API credentials are created, they are automatically stored in the global variable **$HPEGreenLakeSession.apiCredentials**. This global variable is accessible as long as the PowerShell console is active and **Disconnect-HPEGL** has not been used. In other words, as long as your session is active. This data is sensitive because it contains all you need to make API calls with an application API such as Compute Ops Management, Data Services Cloud Console, etc. To get a more complete example of how to deeply interact with Compute Ops Management, see [Interaction-with-COM_Sample](https://github.com/HewlettPackard/POSH-HPEGreenLake/blob/master/Samples/Interaction-with-COM_Sample.ps1) script sample.
  >
  > **Note**: To store the API credentials beyond the duration of the session, the cmdlet provides a **\-Location** parameter. This parameter can be used with **New-HPEGLAPIcredential** to save the API credentials in a directory and the **\-Encrypt** parameter can be utilized to encrypt the API credentials before exporting the JSON file into the designated *Location* directory.

  * **Remove-HPEGLAPIcredential**: to delete an API credential of an application instance
<br/>
<br/>
  > **Note**: Once API credentials are deleted, access to the application instance API is lost permanently. This is because API credentials are used to authenticate and authorize access to the API. When the credentials are deleted, the corresponding API client ID is also invalidated, which means that any requests made using those credentials will be rejected by the API server.

<a name="SubscriptionCmdlets"></a>

## Managing subscriptions with the HPE GreenLake PowerShell library

The main cmdlets for managing subscriptions in the HPE GreenLake platform are the followings:

* To get information about subscriptions: 

  * **Get-HPEGLDeviceSubscription**: to get information about your device subscriptions available in your HPE GreenLake workspace. Several parameters can be used to display the subscriptions with available quantity, the subscriptions that are expired or not expired, etc. For example, you can combine parameters to obtain only the subscription keys that have not expired and for which there are still licenses available: **Get-HPEGLDeviceSubscription -Notexpired -Available**
<br/>
<br/>
* To manage device subscriptions:

  * **Add-HPEGLDeviceSubscription**: to add device subscriptions to the HPE GreenLake workspace
  
  * **Set-HPEGLDeviceAutoSubscription**: to set automatic subscription assignment. This feature automatically assigns a subscription to any supported device that is added to the HPE GreenLake platform
  
  * **Remove-HPEGLDeviceAutoSubscription**: to remove an automatic assignment of subscriptions

* To apply a subscription key to devices:

  * **Set-HPEGLDeviceSubscription**: to apply a subscription key to one or more devices 
<br/>
<br/>
  >  **Note**: When the auto device subscription is not supported or not enabled for the type of device you use, you need to manually apply a subscription key.

  * **Remove-HPEGLDeviceSubscription**: to detach devices from a subscription key 



<a name="LocalGatewayCmdlets"></a>


## Main Cmdlets to manage a local gateway

In HPE GreenLake, you have the ability to view details and manage your local gateway information:
 * **Get-HPEGLLocalGateway**: to get the local gateway details information
 * **Get-HPEGLLocalGatewayCredentials**: to get all user credentials created in a local gateway
 * **New-HPEGLLocalGatewayCredentials**: to add a user credential to a local gateway
 * **Remove-HPEGLLocalGatewayCredentials**: to remove a user credential to a local gateway
 
> **Note**: Adding or deleting a credential can take some time based on connectivity between the local gateway and HPE GreenLake.

<a name="Summary"></a>


# Summary

In this blog, I have introduced you to the primary cmdlets that are provided by the new PowerShell library for the HPE GreenLake platform. However, there are more cmdlets available and much more to explore. Nevertheless, you now possess the necessary knowledge to begin testing and to develop your own PowerShell scripts to start automating tasks so you can experience greater productivity and efficiency.

If you encounter any issues during your testing, it's highly recommended that you open a [New issue](https://github.com/HewlettPackard/POSH-HPEGreenLake/issues) on the library’s GitHub page. This can help improve the library and potentially benefit other users who may be facing similar issues. 

For general questions, or need to discuss a topic that doesn't need to be tracked in the issue tracker, please join the  GitHub Discussions for the project: [Join the discussion](https://github.com/HewlettPackard/POSH-HPEGreenLake/discussions/)

<a name="Wantmore"></a>


# Want more?

* [HPE GreenLake Developer Portal](https://developer.greenlake.hpe.com/)
* To learn more about the HPE GreenLake platform, refer to the [HPE GreenLake Edge to Cloud Platform User Guide](https://support.hpe.com/hpesc/public/docDisplay?docId=a00120892en_us)
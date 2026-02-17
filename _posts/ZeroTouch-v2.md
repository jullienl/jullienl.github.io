![A blue and green gradient AI-generated content may be
incorrect.](./media/image1.png){width="8.469444444444445in"
height="9.836477471566054in"} **HPE Compute Ops Management Zero-Touch
Automation**

Living Lab experience

# Contents {#contents .TOC-Heading}

[HPE Compute Ops Management PowerShell Library
[3](#hpe-compute-ops-management-powershell-library)](#hpe-compute-ops-management-powershell-library)

[Preparation for using the PowerShell library
[5](#preparation-for-using-the-powershell-library)](#preparation-for-using-the-powershell-library)

[Connecting to the lab environment
[6](#connecting-to-the-lab-environment)](#connecting-to-the-lab-environment)

[Preparation of your environment
[8](#preparation-of-your-environment)](#preparation-of-your-environment)

[Step 1 - How to Install HPECOMCmdlets
[12](#step-1---how-to-install-hpecomcmdlets)](#step-1---how-to-install-hpecomcmdlets)

[Step 2 - Get the exported commands
[12](#step-2---get-the-exported-commands)](#step-2---get-the-exported-commands)

[Step 3 - Connection to HPE GreenLake
[15](#step-3---connection-to-hpe-greenlake)](#step-3---connection-to-hpe-greenlake)

[Step 4: Configuration of your workspace
[18](#step-4-configuration-of-your-workspace)](#step-4-configuration-of-your-workspace)

[Task 1 -- Create your first workspace
[18](#task-1-create-your-first-workspace)](#task-1-create-your-first-workspace)

[Task 2 -- Add a user to your workspace
[19](#task-2-add-a-user-to-your-workspace)](#task-2-add-a-user-to-your-workspace)

[Task 3 -- Provision Compute Ops Management
[19](#task-3-provision-compute-ops-management)](#task-3-provision-compute-ops-management)

[Task 4 -- Set a location
[21](#task-4-set-a-location)](#task-4-set-a-location)

[Task 5 - Add a subscription to your workspace
[22](#task-5---add-a-subscription-to-your-workspace)](#task-5---add-a-subscription-to-your-workspace)

[Step 5: Onboarding devices
[23](#step-5-onboarding-devices)](#step-5-onboarding-devices)

[Task 1 - Onboard one server
[23](#task-1---onboard-one-server)](#task-1---onboard-one-server)

[Task 2 -- Set device location and tags
[25](#task-2-set-device-location-and-tags)](#task-2-set-device-location-and-tags)

[Step 6: Configuration of Compute Ops Management
[27](#step-6-configuration-of-compute-ops-management)](#step-6-configuration-of-compute-ops-management)

[Task 1 -- Create server settings
[27](#task-1-create-server-settings)](#task-1-create-server-settings)

[Server Bios Settings
[27](#server-bios-settings)](#server-bios-settings)

[Server Internal Storage Settings
[27](#server-internal-storage-settings)](#server-internal-storage-settings)

[Server Firmware Settings
[28](#server-firmware-settings)](#server-firmware-settings)

[iLO Settings [29](#ilo-settings)](#ilo-settings)

[Task 2 -- Create a group
[29](#task-2-create-a-group)](#task-2-create-a-group)

[Task 3 -- Add servers to the group
[30](#task-3-add-servers-to-the-group)](#task-3-add-servers-to-the-group)

[Step 7 -- Gathering Comprehensive Server Inventory Information
[33](#step-7-gathering-comprehensive-server-inventory-information)](#step-7-gathering-comprehensive-server-inventory-information)

[Step 8 -- Monitoring Server Health, Support, and Warranty Status
[34](#step-8-monitoring-server-health-support-and-warranty-status)](#step-8-monitoring-server-health-support-and-warranty-status)

[Task 1 -- Getting server health status, activities, jobs and alerts
[34](#task-1-getting-server-health-status-activities-jobs-and-alerts)](#task-1-getting-server-health-status-activities-jobs-and-alerts)

[Task 2 -- Getting server support details
[35](#task-2-getting-server-support-details)](#task-2-getting-server-support-details)

[Task 3 -- Collecting and downloading server logs
[36](#task-3-collecting-and-downloading-server-logs)](#task-3-collecting-and-downloading-server-logs)

[Task 4 -- Enabling email notification
[37](#task-4-enabling-email-notification)](#task-4-enabling-email-notification)

[Step 9 -- Updating and Ensuring Server Firmware Compliance
[38](#step-9-updating-and-ensuring-server-firmware-compliance)](#step-9-updating-and-ensuring-server-firmware-compliance)

[Task 1 -- Checking group firmware compliance
[38](#task-1-checking-group-firmware-compliance)](#task-1-checking-group-firmware-compliance)

[Task 2 -- Checking group firmware deviations
[39](#task-2-checking-group-firmware-deviations)](#task-2-checking-group-firmware-deviations)

[Task 3 -- Scheduling group firmware update
[39](#task-3-scheduling-group-firmware-update)](#task-3-scheduling-group-firmware-update)

[Step 10 -- Essential Next Steps for Server Management and
Sustainability
[41](#step-10-essential-next-steps-for-server-management-and-sustainability)](#step-10-essential-next-steps-for-server-management-and-sustainability)

[Task 1 -- Server utilization insights
[41](#task-1-server-utilization-insights)](#task-1-server-utilization-insights)

[Task 2 -- Server sustainability insights
[42](#task-2-server-sustainability-insights)](#task-2-server-sustainability-insights)

[Task 3: Interacting with iLOs using Compute Ops Management SSO
[43](#task-3-interacting-with-ilos-using-compute-ops-management-sso)](#task-3-interacting-with-ilos-using-compute-ops-management-sso)

[Task 4: Testing ILO settings configuration
[44](#task-4-testing-ilo-settings-configuration)](#task-4-testing-ilo-settings-configuration)

[Step 11: Clean the lab for the next participant
[47](#step-11-clean-the-lab-for-the-next-participant)](#step-11-clean-the-lab-for-the-next-participant)

[Task 1: Remove your server from its service assignment
[47](#task-1-remove-your-server-from-its-service-assignment)](#task-1-remove-your-server-from-its-service-assignment)

[Task 2: Remove the subscription key
[47](#task-2-remove-the-subscription-key)](#task-2-remove-the-subscription-key)

[Task 3: Remove the COM service instance
[47](#task-3-remove-the-com-service-instance)](#task-3-remove-the-com-service-instance)

[Task 4: Disconnect from HPE GreenLake
[48](#task-4-disconnect-from-hpe-greenlake)](#task-4-disconnect-from-hpe-greenlake)

[Step 12: Explore Zero Touch Automation with the Sample Script
(Optional)
[50](#step-12-explore-zero-touch-automation-with-the-sample-script-optional)](#step-12-explore-zero-touch-automation-with-the-sample-script-optional)

[Summary [55](#summary)](#summary)

[Want more? [55](#want-more)](#want-more)

# HPE Compute Ops Management PowerShell Library

This lab introduces the HPE Compute Ops Management PowerShell module, a
set of cmdlets for managing and automating your HPE GreenLake
environment. The module enables direct interaction with HPE GreenLake
and Compute Ops Management services from the PowerShell command line,
fitting easily into existing automation workflows.

Development is ongoing, and our efforts are far from finished. As we all
know, SaaS cloud applications evolve over time. Therefore, this library
will be continuously updated to incorporate new features as they are
released by HPE.

![A screenshot of a computer Description automatically
generated](./media/image2.png){width="6.5in"
height="4.517361111111111in"}

This module is available in the PowerShell Gallery under the name
[HPECOMCmdlets](https://www.powershellgallery.com/packages/HPECOMCmdlets),
following the naming convention used by most HPE modules.

![A screenshot of a computer Description automatically
generated](./media/image3.png){width="3.234978127734033in"
height="2.610793963254593in"}

The PowerShell Gallery is a repository for sharing and distributing
PowerShell modules and scripts. It's a community-driven platform that
provides access to various PowerShell resources, enabling you to easily
discover, install, and publish your own PowerShell content. The
PowerShell Gallery can be accessed through the PowerShellGet module
(includes **Install-Module**, **Find-Module**, etc.), which comes
pre-installed with Windows PowerShell 5.0 and above.

This project is also associated with a new public GitHub
[repository](https://github.com/jullienl/HPE-COM-PowerShell-Library)
from our community contributor, Lionel Jullien from HPE. This repository
is where the source code is developed. You can also track
[releases](https://github.com/jullienl/HPE-COM-PowerShell-Library/releases),
report and view
[issues](https://github.com/jullienl/HPE-COM-PowerShell-Library/issues),
and participate in
[discussions](https://github.com/jullienl/HPE-COM-PowerShell-Library/discussions).

This library provides a variety of key features for managing HPE
GreenLake and Compute Ops Management. Here are the main features:

**Authentication**: Establish secure connections to HPE GreenLake using
Single Sign-On (SSO) or single/multi-factor authentication. Whether you
have an existing workspace or not, the library supports flexible
authentication methods to suit your needs.

**Workspace Management**: Create and manage HPE GreenLake workspaces.

**Session Tracking**: Automatically track sessions with the global
session tracker \$HPEGreenLakeSession.

**User Management**: Invite and manage users within your HPE GreenLake
environment, assign roles.

**Resource Management**: Manage resources such as servers, storage, and
networking within your HPE GreenLake environment.

**Service Provisioning**: Provision services like Compute Ops
Management, manage service roles and subscriptions.

**Device Management**: Add devices individually or in bulk using CSV
files, manage device subscriptions and auto-subscriptions, set device
locations and connect devices to services.

**Server configuration Management**: Create and apply BIOS, storage, OS,
and firmware settings. Manager group and apply configurations to groups
of servers.

**Security and Compliance**: Manage iLO security settings and run
inventory and compliance checks.

**Job Scheduling and Execution**: Schedule and execute various tasks
like firmware updates, OS installations, and sustainability reports.

**Notification and Integration**: Enable email notifications for service
events and summaries, integrate with external services like ServiceNow.

**Appliance Management**: Add HPE OneView and Secure Gateway appliances,
upgrade HPE OneView appliances.

**Monitoring and Alerts**: Monitor alerts for your resources to ensure
optimal performance and uptime.

**Reporting**: Generate detailed reports on resource usage, performance,
and other metrics.

**Automation**: Automate repetitive tasks and workflows using PowerShell
scripts and cmdlets.

**Integration**: Seamlessly integrate with other tools and platforms
using REST APIs and webhooks.

**Security**: Implement security best practices and manage access
control for your HPE GreenLake environment.

These features collectively provide a comprehensive set of cmdlets to
manage various aspects of your HPE GreenLake environment and any
existing Compute Ops Management service instances.

## Preparation for using the PowerShell library

To use the HPE Compute Ops Management PowerShell Library, an HPE
GreenLake account is required. The library supports two authentication
methods:

**HPE Account credentials---single-factor authentication (with or
without MFA).**

Requires an HPE Account (username and password)

Direct authentication using HPE Account credentials

**Single Sign-On (SSO) passwordless authentication**

Requires a properly configured Identity provider (IdP) such as Okta,
Ping Identity, or Microsoft Entra ID.

User authentication is handled through an external Identity Provider
using SAML 2.0.

For more details, see [SAML Single Sign-On (SSO) with passwordless
authentication](https://github.com/jullienl/HPE-COM-PowerShell-Library?tab=readme-ov-file#saml-single-sign-on-sso-with-passwordless-authentication).

If you have an HPE GreenLake account or a workspace with properly
configured SSO for passwordless access, **skip this section.**

> **⚠️ Important note\**
> If your user account uses an identity provider---whether supported
> (Okta, Microsoft Entra ID, Ping Identity) or unsupported---that does
> not use passwordless authentication methods (push notifications or
> TOTP), authentication with the *Connect-HPEGL* cmdlet will fail.
>
> **💡 Note\**
> Multi-factor authentication (MFA) was implemented with the release of
> version [1.0.12]{.underline} of the HPECOMCmdlets PowerShell Library.
> SAML Single Sign-On (SSO) support for the three main providers was
> introduced beginning with version [1.0.18]{.underline}.

To create your HPE account for this library, go the HPE GreenLake
interface at <https://common.cloud.hpe.com> and click on **Sign up**:

![](./media/image4.png){width="4.176119860017498in"
height="3.456900699912511in"}

Provide all the required information, accept the terms and conditions
and click on **Create Account**:

![A screenshot of a login form Description automatically
generated](./media/image5.png){width="4.9310925196850395in"
height="3.546593394575678in"}

Once completed, you are ready to access the lab, then to install and use
the library.

## Connecting to the lab environment

To access the HPE Compute BU Enablement Environment, we will use VMware
Horizon. Follow these steps:

Using your Chrome browser, navigate to the appropriate URL based on your
network location to open the Horizon Access Portal:

**External to HPE** (not connected to HPE VPN):\
<https://labs.compute.cloud.hpe.com>

**Internal to HPE** (or connected to HPE VPN):\
<https://techenablement.hpecorp.net>

On the Horizon login screen, click the **Omnissa Horizon Web
Client** button.

> ![](./media/image6.png){width="3.841829615048119in"
> height="4.396440288713911in"}

Login with the credentials provided in your login sheet.

![](./media/image7.png){width="3.5821325459317586in"
height="4.232866360454943in"}

Click on the graphic that represents your Lab environment.

![A screenshot of a computer Description automatically
generated](./media/image8.png){width="6.5in"
height="2.1597222222222223in"}

Since Horizon is presenting a remote desktop session inside of your
desktop's browser, it may be helpful to hit **F11** at this time to put
the browser in full screen mode.

## Preparation of your environment 

You\'ll start by opening **Visual Studio Code** using the shortcut in
the VM's desktop:

> ![](./media/image9.png){width="4.473792650918635in"
> height="4.413521434820647in"}

Once opened, click on **Mark Done**

> ![](./media/image10.png){width="7.268055555555556in"
> height="5.6722222222222225in"}

Start by opening a new file:

> ![](./media/image11.png){width="7.268055555555556in"
> height="4.459722222222222in"}
>
> This new file will be useful to copy/paste all important information
> you find useful to keep an eye on.
>
> ![](./media/image12.png){width="7.268055555555556in"
> height="2.392361111111111in"}

Then open a PowerShell terminal using the **Terminal** menu / **New
Terminal**:

> ![](./media/image13.png){width="5.9130949256342955in"
> height="3.2983606736657918in"}
>
> All the commands outlined in this lab guide should be executed in this
> window.
>
> ![](./media/image14.png){width="7.268055555555556in"
> height="1.9625in"}
>
> You can use the shortcuts **CTRL**+**C** to copy and **CTRL**+**V** to
> paste the commands that are provided in this lab guide.
>
> > **⚠️ Important notes**
>
> > Ensure that each command line you copy and paste from the lab guide
> > into the Horizon session is pasted as a single line. Occasionally,
> > the paste action may introduce hidden characters, causing the
> > command to be interpreted as multiple lines by the target system.

While the PowerShell console is opened, you can optionally launch a
browser to access the HPE GreenLake website and view the results of the
commands you will be executing. If your browser is not already open and
connected to HPE GreenLake, open a browser and navigate to
<https://common.cloud.hpe.com>.

Login with your HPE account credentials:

> ![](./media/image15.png){width="2.261867891513561in"
> height="2.1482797462817147in"}

If this is your first time using HPE GreenLake, it is expected that no
workspace will be available in your environment. If you already have one
or more workspaces, there is no issue; you can still proceed with this
lab.\
\
You can now leave the page and begin your zero-touch automation
experience.

# Step 1 - How to Install HPECOMCmdlets

The first step is to install the library on your Windows virtual
machine. Return to the PowerShell console and enter the following
command:

**Install-Module HPECOMCmdlets**

![](./media/image16.png){width="7.268055555555556in" height="0.9125in"}

This command will download and install the module from the official
PowerShell Gallery repository. If this is your first time installing a
module from the PowerShell Gallery, it will ask you to confirm whether
you trust the repository or not. You can type **Y** and press **Enter**
to continue with the installation.

This library has no dependencies, so it does not require the
installation of any other software or modules to function properly.

# Step 2 - Get the exported commands

- Now that the module is installed, you can get the list of commands
  exported by the module using:

**Get-Command -Module HPECOMCmdlets\
\**
![](./media/image17.png){width="5.38418416447944in"
height="2.8346937882764656in"}

Version **1.0.22** of the module includes over 200 cmdlets.

In PowerShell, cmdlets use a verb-noun naming convention (e.g.,
*Get-**HPECOM**Server* retrieves server data in HPE Compute Ops
Management). Cmdlets start with **HPECOM** for Compute Ops Management or
**HPEGL** for HPE GreenLake (e.g., *New-**HPEGL**User*). The library
supports both platforms due to their close integration.

- To list all cmdlets in the module related to server resources, use the
  following command:

**Get-Command -Module HPECOMCmdlets \| ? name -match server**

![](./media/image18.png){width="4.838377077865267in"
height="2.068581583552056in"}

This command is especially helpful when you\'re dealing with many
cmdlets and need to pinpoint the one that fits your needs best.

> > **Note**: **?** is an alias for **Where-Object** in PowerShell, and
> > **-match** is the operator used to determine if a string matches a
> > regular expression, such as **server** in this example.

- **Get-Help** is another essential PowerShell command for locating
  information about new modules. To utilize this command, enter:

**Get-Help Get-HPECOMserver -Full\
\**
![A screenshot of a computer program Description automatically
generated](./media/image19.png){width="5.808949037620297in"
height="4.205284339457568in"}

**Get-Help** (or the alias **Help**) is a PowerShell cmdlet that allows
you to retrieve information on other PowerShell cmdlets and functions.
By running **Get-Help** in the PowerShell console, you can view detailed
information about the specified cmdlet, including its syntax,
parameters, examples, and related links. Additionally, you can use
specific switches such as **-Detailed**, **-Examples**, or **-Full** to
customize the output.

- Each cmdlet exported from this module provides detailed examples of
  how to use the command. To view the examples for the
  **Get-HPECOMServer** cmdlet, enter:

**Help Get-HPECOMServer -Examples**

This will display a list of examples demonstrating how to use
**Get-HPECOMServer** along with detailed explanations of what each
example does.

> ![A screenshot of a computer Description automatically
> generated](./media/image20.png){width="6.261349518810149in"
> height="4.532788713910761in"}

# Step 3 - Connection to HPE GreenLake

After the module is installed, the next first step is to connect to HPE
GreenLake using the **Connect-HPEGL** command.

At this point, there are two authentication methods available:

- **Single or Multi-Factor Authentication** (MFA): Authenticate using
  your email and password, with optional MFA for added security.

- **SAML Single Sign-On (SSO):** SSO is exclusively supported with Okta,
  Entra ID, and PingID, providing efficient authentication aligned with
  your organization\'s SSO configuration. Please note that specific
  prerequisites must be met for this method, including the requirement
  for passwordless authentication methods such as push notifications or
  TOTP. For detailed guidance on configuring SSO and enabling
  passwordless authentication, refer to
  [Configuring-SAML-SSO-with-HPE-GreenLake-and-Passwordless-Authentication-for-HPECOMCmdlets]{.underline}

Select the below option according to your user authentication method:

- Using Single or Multi-Factor Authentication:

  - Begin by creating a credential object to securely store your HPE
    account credentials (email and password):

**\$MyEmail = \"your_email@your_domain.com\"**

**\$credentials = Get-Credential -UserName \$MyEmail**

To paste your password, use the right-click context menu instead of
pressing CTRL+V.

Then use the credential object with the **Connect-HPEGL** command:

**Connect-HPEGL -Credential \$credentials**

![](./media/image21.png){width="5.616502624671916in"
height="0.28262576552930885in"}

- When MFA is enabled with Okta:

The cmdlet will prompt you to validate the push notification from Okta.

![](./media/image22.png){width="6.5in" height="0.3736111111111111in"}

On your Okta-enabled device, press \"Yes, it's me\" to approve the
authentication request.

![A screenshot of a black screen AI-generated content may be
incorrect.](./media/image23.png){width="1.6688724846894138in"
height="3.6332250656167977in"}

When MFA is enabled with Google Authenticator:

The cmdlet will pause and prompt you to enter the MFA token.

![](./media/image24.png){width="6.5in" height="0.4215277777777778in"}

Open the Google Authenticator app on your device to retrieve the token
and enter it when prompted.

- Using SAML Single Sign-On (SSO) with Okta, PingID or Entra ID:

  - Start by creating an email object:

**\$MyEmail = \"your_email@your_domain.com\"**

- To connect with SAML SSO through your organization's identity provider
  (IdP), enter the following command in your terminal:

**Connect-HPEGL -SSOEmail \$MyEmail**

Once initiated, the cmdlet will prompt you to approve a push
notification sent by your IdP. Follow the on-screen authentication steps
displayed in your terminal. Typically, you'll need to:

- Check your IdP-enabled device for a push notification or
  authentication request.\
  \
  ![](./media/image25.png){width="6.5in" height="0.3902777777777778in"}

- Approve the request (for example, tap the number or "Yes, it's me" in
  Okta or confirm in PingID/Entra ID).\
  \
  ![A screenshot of a black screen AI-generated content may be
  incorrect.](./media/image26.png){width="1.7237423447069116in"
  height="3.7016907261592302in"}

- Complete any additional steps required by your organization's security
  policies.

Once authentication is successful, a secure connection to HPE GreenLake
will be established, allowing you to proceed with subsequent operations.
The **Connect-HPEGL** cmdlet is responsible for initiating and managing
this connection. Upon establishment, it maintains a persistent session
using the **\$HPEGreenLakeSession** connection tracker variable, which
supports all further module cmdlet activities. Furthermore, the cmdlet
issues a temporary API client credential for both HPE GreenLake and any
Compute Ops Management service instances provisioned within your
workspace.

> **💡 Note\**
> You can use **Get-Help Connect-HPEGL -Full** to access the complete
> help documentation, technical details, and in-depth explanations for
> **Connect-HPEGL**.

If you have no workspace tied to your HPE account, the **Connect-HPEGL**
command will return a warning message indicating that you need to create
your first workspace:

![](./media/image27.png){width="6.5in" height="0.5180555555555556in"}

If you already have one or more workspaces available, the command will
return a warning message indicating that you need to use a second
command to connect to one of the workspaces:

![](./media/image28.png){width="6.5in" height="0.5270833333333333in"}

> **💡 Note\**
> To directly connect to an existing and known workspace, you can use
> the command **Connect-HPEGL -Credential \$credentials -Workspace
> \"My_workspace_name\"**. Please note that this command should not be
> used in this lab.

# Step 4: Configuration of your workspace

## Task 1 -- Create your first workspace

To create your initial workspace (or an extra one just for this
lab---don\'t worry, it will be deleted once the lab ends), you need to
provide a unique name. Since the name must be unique across all
workspaces on the HPE GreenLake platform, we will use a random number to
generate the name. Enter:

\$WorkspaceName = \"HPEWorkspaceTxx\_\$(Get-Random)\"

With **xx**, your team number. This command generates a name such as
\"HPEWorkspaceT01_12345678\" for team 1. You can verify your workspace
name by executing **\$WorkspaceName.\**

> > **⚠️** **Important note**
>
> > You must follow the specified naming convention exactly to ensure
> > that our lab reset scripts function properly at the end of this
> > session. Your strict adherence is required.

Next, type the following command using your own parameters:

**New-HPEGLWorkspace -Name \$WorkspaceName\
-Type** *\<Press the tab key and select 'Standard enterprise
workspace'\>* **\
-Country** *\<Press the tab key to get the list of supported countries
and select one\>* **\
-Street \"A street address\"\**

> > **🎯 Tip**
>
> > If you encounter any difficulties while creating your workspace, use
> > this example below (you can copy/paste the whole block):
>
> > **New-HPEGLWorkspace \`\
> > -Name \$WorkspaceName \`\
> > -Type \'Standard enterprise workspace\' \`\
> > -Street \"Street address\" \`\
> > -Country Canada**

![](./media/image29.png){width="5.121910542432196in"
height="0.7126137357830271in"}**\**

> > **💡 Note**: The Tab key activates the auto-completion feature,
> > which presents available property values for selection. This
> > function enhances efficiency and accuracy by reducing manual entry
> > errors and saving time.
>
> > **📌 Note**: In the example above, only the *name*, *type*,
> > *country*, and *street* parameters are included because they are
> > required. However, you can also specify optional parameters like
> > *city*, *state*, *email* address, and others.
>
> > **💡 Note**: The \" **\`**\" (space + back quote) at the end of each
> > line tells PowerShell to treat the command as continuous across
> > lines, allowing it to run as a single command and making copy-paste
> > easier.

After executing this command, the workspace is created, and the command
automatically disconnects the session. To connect to your new workspace,
enter:

**Connect-HPEGL -Credential \$credentials -Workspace \$WorkspaceName**

> ![](./media/image30.png){width="6.5in" height="0.49027777777777776in"}

To check the content of your workspace, enter:

**Get-HPEGLWorkspace**

> ![](./media/image31.png){width="6.5in" height="0.46597222222222223in"}

## Task 2 -- Add a user to your workspace

There are several commands that are available to configure a workspace
and the different resources available in a workspace, such as adding
users, settings roles, location, etc. In this task, you will simply add
a new user with a specific role.

To invite new users to your workspace with a designated role, utilize
the *Send-HPEGLUserInvitation* cmdlet. Please invite admin@hpelabs.us as
an [administrator]{.underline} to your newly created workspace:

\$NewUserEmail = \"admin@hpelabs.us\"

New-HPEGLUser -Email \$NewUserEmail -RoleName \'Workspace
Administrator\'

> > **⚠️ Important note**
>
> > It is [essential]{.underline} to add this admin user so that the lab
> > reset scripts operate as intended at the conclusion of this session.
> > Thank you for your cooperation.

To verify the new user, execute the following command:

**Get-HPEGLUser**

## Task 3 -- Provision Compute Ops Management

The following step involves setting up services. There are several kinds
of services you can provision across different regions.

To see all available services, use:

**Get-HPEGLService -ShowUnprovisioned**

This command lists all unprovisioned services, including those for
networking devices (HPE Aruba Networking Central), compute devices
(Compute Ops Management), storage devices (Data Services), OpsRamp, etc.

The **ProvisionStatus** column will indicate UNPROVISIONED for each
listed service. You can choose to provision any of these, as long as you
have the needed permissions.

In this lab exercise, you\'ll set up the Compute Ops Management (COM)
service in the European central region. Enter:

**\$Region = \"eu-central\"**

**New-HPEGLService -Name \"Compute Ops Management\" -Region \$Region**

> > **💡 Note**: Additional regions are available; to view different
> > supported regions, use: **Get-HPEGLService -Name \"Compute Ops
> > Management\"**

To confirm that the COM instance is provisioned, run:

**Get-HPEGLService -ShowProvisioned\**

Next, assign the \'Administrator\' role for Compute Ops Management to
both you and the invited user:

\$MyEmail, \$NewUserEmail \| Add-HPEGLRoleToUser -RoleName \'Compute Ops
Management \` administrator\'

> > **💡 Note**: Press the Tab key to display the available list of role
> > names.
>
> **💡 Note**: Alternatively, you may choose to execute the identical
> command in two separate instances:
>
> **Add-HPEGLRoleToUser -RoleName \'Compute Ops Management
> administrator\' -Email \$MyEmail**
>
> **Add-HPEGLRoleToUser -RoleName \'Compute Ops Management
> administrator\' -Email \$NewUserEmail**

Finally, verify the role assignments with:

Get-HPEGLUserRole -Email \$MyEmail

Get-HPEGLUserRole -Email \$NewUserEmail

## Task 4 -- Set a location

Locations in Service Delivery Information (SDI) store addresses,
contacts, and support details for automation. Assigning a device to a
location links it physically for automated support, including ticket
creation with HPE.

This step is essential for automatically creating a ticket with HPE
support.

To create a location, enter:

\$LocationName = \"Your_customized_location_name\"

New-HPEGLLocation -Name \$LocationName \`

 -Description \"Your customized description\" \`

 -Country *\<Press tab to view supported countries \>* \`

 -Street \"Your customized street address\" \`

 -City \$LocationName \`

 -State \"NA\" \`

 -PostalCode \"123456789\" \`

 -PrimaryContactEmail \$MyEmail

> > **🎯 Tip**
>
> > If you encounter any difficulties while creating your location, use
> > the working example below:
>
> > **\$LocationName = \"Brasilia\"**
>
> > **New-HPEGLLocation -Name \$LocationName \`**
>
> > **-Description \"Building where all AI servers are located\" \`**
>
> > **-Country Brazil \`**
>
> > **-Street \"StreetAddress\" \`**
>
> > **-City \$LocationName \`**
>
> > **-State \"NA\" \`**
>
> > **-PostalCode \"123456789\" \`**
>
> > **-PrimaryContactEmail \$MyEmail**

Check the location with:

**Get-HPEGLLocation**

## Task 5 - Add a subscription to your workspace

To activate compute devices that will be added later to your workspace,
you need to install a COM subscription key, enter:

**New-HPEGLSubscription -SubscriptionKey \"**\<*key found in the login
sheet*\>**\"**

To check the subscription, enter:

**Get-HPEGLSubscription**

Workspaces have two subscription management options:

- **Assignment**: Controls automatic subscription assignment when
  devices are added.

- **Re-assignment**: Controls if subscriptions are reassigned when one
  expires or is canceled. Note that auto-reassignment is enabled by
  default for all device types. 

  You can retrieve these options using:

**Get-HPEGLDeviceAutoSubscription**

And

**Get-HPEGLDeviceAutoReassignSubscription**

Set the automatic subscription assignment for Compute:

**Set-HPEGLDeviceAutoSubscription -ComputeSubscriptionTier ENHANCED**

> > **💡 Note:** Auto-reassignment is enabled by default for all device
> > types; therefore, manual configuration of automatic subscription
> > re-assignment for Compute devices is generally unnecessary. For
> > reference, you may enable it manually using
> > **Set-HPEGLDeviceAutoReassignSubscription -Computes** if it was
> > previously disabled with
> > **Remove-HPEGLDeviceAutoReassignSubscription.**

# Step 5: Onboarding devices 

You can add devices to a workspace either one at a time or in bulk.
Another option is to use a COM activation key, which lets you add single
or multiple compute devices directly to a Compute Ops Management (COM)
instance. In this lab, you\'ll be using that specific method.

> **🎯 Note**: For onboarding multiple servers, use the [HPE Compute Ops
> Management Onboarding
> Script](https://github.com/jullienl/HPE-Compute-Ops-Management/tree/main/PowerShell/Onboarding).
> This PowerShell tool automates connecting HPE servers to COM, applies
> activation keys, and sets up initial iLO configurations (DNS, NTP,
> tags, location, firmware/compliance policies). It also manages
> authentication, device registration, and early configuration for a
> streamlined "zero-touch" setup.

## Task 1 - Onboard one server

To generate an activation key for connecting your server to the Compute
Ops Management instance in the region you provisioned earlier, use the
following command:

**\$Activation_Key = New-HPECOMServerActivationKey -Region \$Region**

This command should be used in conjunction with the **-Region**
parameter, consistent with other HPECOM cmdlets, to specify the COM
instance---that is, the region where the COM instance is provisioned and
where the command will be executed. Please note that the auto-completion
tab can be utilized to display the available region codes provisioned
within your workspace.

> > **🔔 Note:** This method is supported only for the following iLO
> > versions:
>
> > iLO 5: Version 3.09 or later
>
> > iLO 6: Version 1.64 or later

To see the activation key that has been generated, you can enter:

**\$Activation_key**

> > **💡 Note**: No subscription key is needed with this command because
> > auto-subscription for Compute has been enabled earlier using
> > **Set-HPEGLDeviceAutoSubscription**.

Next, assign the IP address of your iLO to a variable by entering the
following command. Be sure to use the IP address listed in the login
sheet provided by your instructor. Enter:

**\$iLO_IP = \"**xx.xx.xx.xxx**\"**

And assign the password of your iLO, also found in the login sheet to
another variable:

**\$iLO_Password = \"**xxxxxxxxxxxx**\"**

Then execute the following commands to connect the iLO to the COM
instance using the activation key that was generated earlier:

**\$iLO_SecurePassword = ConvertTo-SecureString \$iLO_Password
-AsPlainText -Force**

**\$iLO_credential = New-Object
System.Management.Automation.PSCredential \`\
(\"Administrator\", \$iLO_SecurePassword)**

**Connect-HPEGLDeviceComputeiLOtoCOM -iLOCredential \$iLO_credential
-IloIP \$iLO_IP \`\
-ActivationKeyfromCOM \$Activation_Key -SkipCertificateValidation\**

> > **💡 Note**: The **SkipCertificateValidation** parameter bypasses
> > all certificate validation steps, including checks for expiration,
> > revocation, and trusted root authority. This approach is insecure
> > and generally discouraged. It should only be used with known hosts
> > that are using self-signed certificates, which applies in our
> > scenario.
>
> ![](./media/image32.png){width="7.104351487314085in"
> height="0.45263888888888887in"}
>
> > 💡 **Note**: The **Connect-HPEGLDeviceComputeiLOtoCOM** cmdlet
> > provides additional parameters to connect iLO through a COM Secure
> > Gateway or through a web proxy.
>
> 💡 **Note**: In scenarios involving a Secure Gateway (**not applicable
> to this lab**), the commands would be as follows:
>
> 1\. Obtain a valid subscription key:
>
> **\$SubscriptionKey = Get-HPEGLSubscription -ShowWithAvailableQuantity
> -ShowValid \`\
> -FilterBySubscriptionType Server \| Select-Object -First 1
> -ExpandProperty key**
>
> 2\. Retrieve the Secure Gateway object:
>
> **\$SG = Get-HPECOMAppliance -Region \$Region -Name sg01.domain.com**
>
> 3\. Create a Secure Gateway activation key:
>
> **\$Activation_Key = New-HPECOMServerActivationKey -Region \$Region
> -SecureGateway \$SG \`\
> -SubscriptionKey \$SubscriptionKey**
>
> 4\. Use the Secure Gateway activation key to connect the iLO to COM
> and set the Secure Gateway as the\
> iLO\'s proxy server:
>
> **Connect-HPEGLDeviceComputeiLOtoCOM -iLOCredential \$iLO_credential
> -IloIP \"**\<iLO_IP\>**\" \`\
> -ActivationKeyfromCOM \$Activation_Key -SkipCertificateValidation \`\
> -IloProxyServer sg01.domain.com -IloProxyPort 8080  **

You can then verify the onboarded servers using the following cmdlet:

**Get-HPEGLDevice\
\**
![A screenshot of a computer Description automatically
generated](./media/image33.png){width="6.5in"
height="0.8409722222222222in"}

> > **💡 Note**: This method not only automatically assigns servers to
> > the COM service instance but also automatically applies a
> > subscription key to the devices.

As the device has been automatically assigned to your COM instance with
a subscription key, you are now able to utilize COM cmdlets. For
instance, you may use:

**Get-HPECOMServer -Region \$Region**

> ![](./media/image34.png){width="7.268055555555556in"
> height="0.45902777777777776in"}

Note that the output differs slightly from the output of the
**Get-HPEGLDevice** command. It adds additional information such as the
power state, the connected state, the iLO IP address, and more. However,
always remember that the output is a formatted view and does not show
the entire content of the returned object. To get the full details, you
need to pipe the command to **Format-List** (**\| fl**) at the end.

To determine the number of remaining licenses, execute the following
command:

**Get-HPECOMServer -Region \$Region -ShowSubscriptionDetails\**

![](./media/image35.png){width="7.268055555555556in"
height="0.5326388888888889in"}

Before proceeding with the next steps in the lab, ensure that your
server is powered on by checking the **PowerState** column in the output
above. If the server is not **ON**, run the following command:

**Get-HPECOMServer -Region \$Region \| Start-HPECOMServer**

![](./media/image36.png){width="7.268055555555556in"
height="0.6826388888888889in"}

This command will power on all servers managed by COM. Since you
currently have only one server onboarded, it will specifically start
that device.

## Task 2 -- Set device location and tags

Next you need to set the device location. As indicated earlier, this
step is important to ensure that support cases are automatically created
in the event of device failures. To do so, enter:

**Get-HPEGLdevice \| Set-HPEGLDeviceLocation -LocationName
\$LocationName**

> ![](./media/image37.png){width="4.035792869641295in"
> height="0.5592158792650919in"}

To verify that the location has been correctly assigned to your device,
use the following command:

**Get-HPEGLdevice**

![](./media/image38.png){width="7.268055555555556in"
height="0.4284722222222222in"}

> > **📝 Note**: Expand the PowerShell console to its maximum width to
> > ensure that you can see the Location property in the output.

Next, you can assign tags to your device. A tag is a form of metadata
that uses a key-value pair (e.g., App=AI) and can be applied to any
resource. Tags are primarily used to categorize resources based on
purpose, owner, environment, or other criteria.

> > **ℹ️ Note**: Tags are particularly important for extending filtering
> > capabilities and enhancing the use of scope-based access control,
> > which allows you to limit users\' abilities to perform actions on a
> > selected list of resources. These resources can be categorized based
> > on various criteria, such as generation, model, groups, and most
> > importantly, tags.

Add two tags to your device: one for country location and one for AI
application type. Use this command:

**Get-HPEGLDevice \| Add-HPEGLDeviceTagToDevice -Tags \"Country=FR,
App=AI\"**

> ![](./media/image39.png){width="7.268055555555556in"
> height="0.5979166666666667in"}

To verify that the tags have been correctly assigned to your device, use
the following command:

> **Get-HPEGLdevice -ShowTags\
> \**
> ![](./media/image40.png){width="7.268055555555556in"
> height="0.5909722222222222in"}

# Step 6: Configuration of Compute Ops Management

The following step involves setting up Compute Ops Management. This
process includes various tasks like setting up server configurations,
forming groups, assigning servers to these groups and much more. The
steps to complete this setup are outlined below:

## Task 1 -- Create server settings

A setting in COM is a collection of parameters that you can apply to one
or more servers through groups. These settings include parameters such
as BIOS, internal storage, firmware, OS, etc.

### Server Bios Settings

Server BIOS Settings allow you to create a new BIOS configuration for
servers using either a workload profile or custom parameters, ensuring
consistent settings across server groups. The
**New-HPECOMSettingServerBios** cmdlet provides many options; for
details on available parameters and how they behave with different iLO
versions and server generations, refer to the help section of the
cmdlet.

> **ℹ️ Note**: Server BIOS settings can\'t be managed from the UI---they
> can only be created today through the COM API using the
> **New-HPECOMSettingServerBios** cmdlet.

To create a bios setting with a few customized options, enter:

**\$BiosSettingName = \"Custom-Bios-For-AI\"**

**New-HPECOMSettingServerBios -Region \$Region -Name \$BiosSettingName
-WorkloadProfileName \` \"Virtualization - Max Performance\"
-AsrStatus:\$True -AsrTimeoutMinutes Timeout10**

This command creates a new BIOS setting configuration tailored for
virtualization with maximum performance. It also enables the Automatic
Server Recovery (ASR) feature and sets the timeout for the ASR feature
to 10 minutes.

![](./media/image41.png){width="4.925033902012249in"
height="0.5326902887139108in"}

To verify the newly created BIOS setting, enter:

**Get-HPECOMSetting -Region \$Region -Name \$BiosSettingName**

![](./media/image42.png){width="7.821461067366579in"
height="0.4994083552055993in"}

### Server Internal Storage Settings

These settings allow you to configure a new server storage setup with
different volumes using selected RAID type and size, ensuring uniform
storage across groups.

To configure for example a configuration with two volumes: OS on RAID1
with two SAS drives, and data on RAID5 with three SSDs plus two spares,
enter:

**\$InternalStorageSettingName = \"RAID-Configuration-for-AI-Servers\"**

**\$volume1 = New-HPECOMSettingServerInternalStorageVolume -RAID RAID5
-DriveTechnology \` NVME_SSD -IOPerformanceMode ENABLED -ReadCachePolicy
OFF -WriteCachePolicy \` WRITE_THROUGH -SizeinGB 100 -DrivesNumber 3
-SpareDriveNumber 2**

**\$volume2 = New-HPECOMSettingServerInternalStorageVolume -RAID RAID1
-DriveTechnology \` SAS_HDD**

**New-HPECOMSettingServerInternalStorage -Region \$Region -Name
\$InternalStorageSettingName \`\
-Volumes \$volume1, \$volume2 -Description \"RAID1 and RAID5 server
settings for AI systems\"**

![](./media/image43.png){width="6.789987970253718in"
height="0.5767530621172353in"}

To verify the newly created internal storage setting, enter:

**Get-HPECOMSetting -Region \$Region -Name
\$InternalStorageSettingName**

![](./media/image44.png){width="5.578793744531933in"
height="0.5330391513560805in"}

To verify the two volumes that are defined:

**Get-HPECOMSetting -Region \$Region -Name \$InternalStorageSettingName
-ShowVolumes\
\**
![](./media/image45.png){width="4.274094488188976in"
height="0.7718274278215224in"}

### Server Firmware Settings

These settings allow you to set baselines for updating server firmware,
helping maintain consistent firmware versions across groups of servers.

To set up firmware, start by finding the latest baseline for the
relevant generation using:

**Get-HPECOMFirmwareBaseline -Region \$Region -Generation 11
-LatestVersion\
\**
![](./media/image46.png){width="6.329625984251969in"
height="0.5636548556430446in"}

To create the firmware setting with the latest baselines for both Gen10
and Gen11, enter:

**\$FirmwareSettingName = \"Latest-Firmware-Baselines-for-AI\"**

**\$Gen10_Firmware_Baseline= Get-HPECOMFirmwareBaseline -Region \$Region
-LatestVersion \`\
-Generation 10 \| select -ExpandProperty releaseVersion**

**\$Gen11_Firmware_Baseline = Get-HPECOMFirmwareBaseline -Region
\$Region -LatestVersion \`\
-Generation 11 \| select -ExpandProperty releaseVersion**

**New-HPECOMSettingServerFirmware -Region \$Region -Name
\$FirmwareSettingName \`\
-Description \"FW baseline for AI servers\"
-Gen10FirmwareBaselineReleaseVersion \` \$Gen10_Firmware_Baseline
-Gen11FirmwareBaselineReleaseVersion \$Gen11_Firmware_Baseline\
\**
![](./media/image47.png){width="7.268055555555556in"
height="0.6569444444444444in"}

To verify the newly created firmware setting, enter:

**Get-HPECOMSetting -Region \$Region -Name \$FirmwareSettingName**

![](./media/image48.png){width="7.268055555555556in"
height="0.4534722222222222in"}

### iLO Settings

ILO settings enable the configuration of specific parameters to
standardize iLO management across server groups. These settings support
a range of options, including network protocols, SNMP, user accounts,
security features, and update services. The
**New-HPECOMSettingiLOSettings** cmdlet provides many options; for
details on available parameters, refer to the help section of the
cmdlet.

To configure iLO settings, enter:

**\$iLOSettingName = \"AI_iLO_Settings\"**

**New-HPECOMSettingiLOSettings -Region \$Region -Name \$iLOSettingName
\`\
-Description \"iLO Settings for AI Servers\" -VirtualMedia Enabled
-PasswordComplexity Enabled \`\
-WebServerSSL Enabled -AcceptThirdPartyFirmwareUpdates Disabled**

This command activates iLO virtual media, enforces password complexity,
enables HTTPS, and disables third-party firmware updates.\
\
![](./media/image49.png){width="5.025104986876641in"
height="0.5118821084864392in"}

To verify the newly created iLO settings, enter:

**Get-HPECOMSetting -Region \$Region -Name \$iLOSettingName**

![](./media/image50.png){width="7.268055555555556in"
height="0.5256944444444445in"}

## Task 2 -- Create a group

In this task you will create a new group incorporating the different
settings created earlier. Groups enable you to organize your servers
into custom-defined sets for easier monitoring and manageability. The
server-related settings and policies you created earlier can be applied
to a single group, as you will do in this lab, or to multiple groups as
needed.

To create a new group, enter:

**\$GroupName = \"AI_Group\"**

**New-HPECOMGroup -Region \$Region -Name \$GroupName -Description \"My
new group for AI servers\" \` -BiosSettingName \$BiosSettingName
-AutoBiosApplySettingsOnAdd:\$false \`\
-iLOSettingName \$iLOSettingName -AutoIloApplySettingsOnAdd:\$true \`\
-FirmwareSettingName \$FirmwareSettingName
-AutoFirmwareUpdateOnAdd:\$false \`\
-PowerOffServerAfterFirmwareUpdate:\$false -FirmwareDowngrade:\$false
\`\
-StorageSettingName \$InternalStorageSettingName
-AutoStorageVolumeCreationOnAdd:\$false \`\
-AutoStorageVolumeDeletionOnAdd:\$false -TagUsedForAutoAddServer
\"App=AI\"\**

![](./media/image51.png){width="5.221725721784777in"
height="0.6685258092738408in"}

This command creates the new group "AI_Group" with previously configured
BIOS, firmware, storage, and iLO settings. Additionally, the command
specifies whether certain actions, such as applying settings or creating
storage volumes, should be automated when servers are added to the
group. These are called group policies. The \"App=AI\" tag is defined so
that any server with this tag during onboarding will automatically be
added to this group.

> > **💡 Note**: The server operating system image setting is not used
> > in this command but is another setting that can be utilized to
> > install the operating system using an ISO image and optionally a
> > kickstart file.

To verify the newly created group, enter:

**Get-HPECOMGroup -Region \$Region**

![](./media/image52.png){width="7.268055555555556in" height="0.56875in"}

Note that, as configured earlier, 4 settings are applied to that group.

To display the settings list, type:

**Get-HPECOMGroup -Region \$Region -Name \$GroupName -ShowSettings**

![](./media/image53.png){width="6.0087773403324585in"
height="0.9168755468066492in"}

Additionally, you may review the policies currently assigned to the
group by using the following:

**Get-HPECOMGroup -Region \$Region -Name \$GroupName -ShowPolicies\
\**
![](./media/image54.png){width="6.020310586176728in"
height="1.5226213910761155in"}

Keep in mind that only the iLO settings take effect right away after you
add servers to the group.

## Task 3 -- Add servers to the group

The next task is to add your server to the new group. According to the
group policies, only the iLO settings will be applied immediately upon
adding the servers to the group.

To assign all servers (in this instance, only one server) to the newly
created group, proceed as follows:

**Get-HPECOMServer -Region \$Region \| Add-HPECOMServerToGroup
-GroupName \$GroupName**

![](./media/image55.png){width="6.541096894138232in"
height="0.6549846894138233in"}

To verify that the new server has been added to the group, enter the
following command:

**Get-HPECOMGroup -Region \$Region -Name \$GroupName -ShowMembers**

![](./media/image56.png){width="5.428054461942257in"
height="0.6561373578302712in"}

To monitor the progress of active related group jobs, execute the
following command at regular intervals.

**Get-HPECOMJob -Region \$Region -Category Group -ShowRunning**

![](./media/image57.png){width="7.268055555555556in"
height="0.6222222222222222in"}

This command shows all the running jobs associated with the group
category.

> > **📝 Note**: Each time a server is added to a group that includes
> > firmware or iLO settings, an automatic process is initiated. This
> > process triggers a group firmware compliance report job and a group
> > iLO settings compliance job to ensure the servers meet the
> > requirements of the associated firmware baselines and iLO settings.

To review the related server jobs that are presently active, execute the
command multiple times:

**Get-HPECOMJob -Region \$Region -Category Server -ShowRunning**

![](./media/image58.png){width="7.268055555555556in"
height="0.6798611111111111in"}

This command lists active jobs for the server category, focusing on the
\"add to group\" action.

Once all jobs have finished running, execute the command below to check
their status:

**Get-HPECOMJob -Region \$Region**

![](./media/image59.png){width="7.268055555555556in"
height="0.9222222222222223in"}

> > **📝 Note**: Compute Ops Management tracks iLO settings and compares
> > them to the desired configuration. Whenever iLO changes are
> > detected, Compute Ops Management automatically verifies compliance.

You can check the compliance status of firmware and ILO settings in
several ways, such as by using **Get-HPECOMGroup** or
**Get-HPECOMServer**. To verify the group compliance, use the following
method:

**Get-HPECOMGroup -Region \$Region -Name \$GroupName -ShowCompliance**

![](./media/image60.png){width="7.268055555555556in"
height="0.5013888888888889in"}

This command generates a comprehensive compliance status report for all
types, including firmware, iLO settings, and external storage. Notably,
the iLO settings status is \'COMPLIANT,\' which confirms that the
group-defined iLO settings have been properly implemented on the iLO.

> > **📝 Note**: The COM API does not track BIOS settings compliance.
> > This is why you only see these three compliance types in the cmdlets
>
> > **💡 Note:** The **Get-HPECOMServer** command includes several
> > parameters **-ShowGroupCompliance**,\
> > **-ShowGroupiLOSettingsCompliance**, or
> > **-ShowGroupFirmwareCompliance**---that allow you to directly check
> > compliance on a specified server.

# Step 7 -- Gathering Comprehensive Server Inventory Information

Keeping accurate server inventory is crucial for effective IT
management---it enables quick troubleshooting, ensures compliance, and
helps identify issues before they escalate. Compute Ops Management
streamlines this by automatically collecting and updating detailed
server inventory, so administrators always have the latest information
on hand.

To obtain detailed server inventory information, use the
**Get-HPECOMServerInventory** cmdlet along with the\
**-Name** parameter. The **-Name** parameter accepts either the server's
name or its serial number, allowing you to specify the server from which
you wish to retrieve inventory data.

But before that, capture the serial number of your server to facilitate
all subsequent commands, enter:

**\$SN = Get-HPECOMServer -Region \$Region \| Select-Object
-ExpandProperty SerialNumber**

Then to generate a detailed memory report of your server using the
**\$SN** variable, run:

**Get-HPECOMServerInventory -Region \$Region -Name \$SN -ShowMemory**

![](./media/image61.png){width="7.268055555555556in" height="1.03125in"}

Additional reporting options are available via the same command, like
for a report on the CPU:

**Get-HPECOMServerInventory -Region \$Region -Name \$SN -ShowProcessor**

![](./media/image62.png){width="7.268055555555556in"
height="0.46805555555555556in"}

> There are several -Show commands for different server inventory data.
> For efficiency, type **-Show** and press **CTRL**+**SPACE** to view
> all property options or use **Tab** for auto-completion.
>
> **💡 Note**: Running **-ShowSoftware** may return no data if your
> server\'s operating system or HPE Agentless Management Service (AMS)
> is not installed or running. Same with **-ShowSmartUpdateTool** if SUT
> is not installed and running.
>
> 💡 **Note**: If it is necessary to initiate the collection of server
> inventory data (for example, if existing data may be outdated), the
> following command can be used to force a hardware inventory
> collection:
>
> **Get-HPECOMServer -Region \$Region \| New-HPECOMServerInventory
> -Async**
>
> The **-Async** parameter allows the cmdlet to return the asynchronous
> job resource immediately. By default, the cmdlet will wait for the job
> to finish before returning.

# Step 8 -- Monitoring Server Health, Support, and Warranty Status

One of the key responsibilities in server management is troubleshooting
issues, managing open cases, monitoring server health, and ensuring that
servers remain under warranty coverage. In Step 8, effective server
management includes tasks such as confirming operational status,
reviewing health summaries, monitoring current activities and alerts,
retrieving support details and cases, and identifying servers with
recent support incidents for proactive maintenance. The
**Get-HPECOMServer** cmdlet, along with its related inventory and job
parameters, provides a comprehensive toolkit for these tasks.
Specifically, you can:

- Check overall server health and component status (fans, memory,
  network, power supplies, processor, storage, temperature, BIOS, health
  LEDs) using **-ShowHealthStatus**.

- Review current activities and alerts with **-ShowActivities** and
  **-ShowAlerts**.

- Retrieve detailed support information and warranty details using
  **-ShowSupportDetails**.

- Manage and track open support cases with **-ShowSupportCases**, and
  identify servers with recent support cases via
  -**ShowServersWithRecentSupportCases**.

- Review recent jobs performed on the server using -ShowJobs.

These features collectively enable robust monitoring, efficient
troubleshooting, and proactive resolution of server issues, ensuring
optimal server performance and support coverage.

## Task 1 -- Getting server health status, activities, jobs and alerts

The first step in server troubleshooting is to confirm that the server
is operational and verify the absence of any active alerts.

To review your server\'s health status, execute the following command:

**Get-HPECOMServer -Region \$Region -Name \$SN -ShowHealthStatus**

![](./media/image63.png){width="7.268055555555556in"
height="0.5451388888888888in"}

To retrieve the list of activities from the past month on your server,
you can use:

**Get-HPECOMServer -Region \$Region -Name \$SN -ShowActivities**

![](./media/image64.png){width="7.268055555555556in"
height="0.9715277777777778in"}

> You can use the dedicated cmdlet **Get-HPECOMActivity -Region \$Region
> -SourceName \$SN** to retrieve COM activities, which offers enhanced
> options such as filtering by time, category, or source name.

To retrieve all alerts associated with your server, use:

**Get-HPECOMServer -Region \$Region -Name \$SN -ShowAlerts**

![](./media/image65.png){width="7.268055555555556in"
height="0.49166666666666664in"}

> Alerts provide security information and issues related to servers. By
> default, all alerts associated with your server are returned. You can
> use the dedicated cmdlet **Get-HPECOMAlert** to get more options and
> filters.

You may receive some returned alerts with a less-than-ideal output view.
To view different properties, consider running:

**Get-HPECOMServer -Region \$Region -Name \$SN -ShowAlerts \|
Format-List**

![](./media/image66.png){width="6.237119422572179in"
height="2.845022965879265in"}

To obtain a comprehensive list of jobs associated with your server for
the last month, including their current state (\"PENDING\" (waiting to
start), \"RUNNING\" (in progress), \"STALLED\" (stuck), \"ERROR\"
(failed), or \"COMPLETE\" (finished successfully), you can run:

**Get-HPECOMServer -Region \$Region -Name \$SN -ShowJobs**

![](./media/image67.png){width="7.268055555555556in"
height="0.9243055555555556in"}

> You can also utilize the specialized cmdlet **Get-HPECOMJob -Region
> \$Region -SourceName \$SN** to retrieve a list of jobs associated with
> a specific source name. By default, this command returns jobs from the
> past seven days, but you can broaden your search using parameters like
> **-ShowLastMonth** to include the previous month or **-ShowAll** for
> the complete job history. Additionally, you have the option to filter
> results to display only jobs that are currently running with
> **-ShowRunning**, or to show only jobs that are waiting in the queue
> by using **-ShowPending**.

Please be advised that to obtain the list of jobs related to your group,
you may use the following method:

> **Get-HPECOMJob -Region \$Region -SourceName \$GroupName**
>
> ![](./media/image68.png){width="7.235732720909886in"
> height="0.6398261154855643in"}

If you need to view detailed job information or troubleshoot specific
tasks, you can refine your queries further by using additional
parameters. For example, to quickly identify and analyze the most recent
job that has failed, you can target your search accordingly:

> **Get-HPECOMJob -Region \$Region \| Where-Object resultCode -eq
> FAILURE \| Select-Object -First 1 \| Format-List**
>
> This flexibility helps in managing and monitoring server operations
> more effectively, especially in large or complex environments.

## Task 2 -- Getting server support details

The subsequent phase in server troubleshooting involves verifying the
support details. This information is crucial for determining warranty
status and its duration.

To make sure the server is still supported, you can run.

**Get-HPECOMServer -Region \$Region -Name \$SN -ShowSupportDetails**

![](./media/image69.png){width="7.268055555555556in"
height="0.5430555555555555in"}

> > **⚠️ Note**: Your assigned lab server may not have a support
> > contract warranty.

You can use the following command to verify whether COM has
automatically created a support case:

**Get-HPECOMServer -Region \$Region -Name \$SN -ShowSupportCases**

![](./media/image70.png){width="7.268055555555556in"
height="0.6534722222222222in"}

Note that if no support cases are found for the specified server, the
cmdlet returns no output.

> **💡 Note**: **Get-HPECOMServer -Region \$Region
> -ShowServersWithRecentSupportCases** can be used to list servers with
> recent support cases.

## Task 3 -- Collecting and downloading server logs

When encountering a critical server issue, HPE support may request the
collection and submission of your server's Active Health System (AHS)
logs for deeper analysis. Traditionally, gathering these logs can be a
complex and time-consuming task. Fortunately, the provided module
streamlines this process by offering a straightforward method to collect
server logs for any specified server, making troubleshooting more
efficient and accessible.

To initiate the collection and download of server logs, enter:

**Get-HPECOMServerLogs -Region \$Region -Name \$SN -DownloadAHSLogs
-Path .\
\**
![](./media/image71.png){width="7.268055555555556in"
height="0.4840277777777778in"}

> The **-DownloadAHSLogs** parameter enables you to include Active
> Health System (AHS) logs along with the regular server logs. AHS logs
> offer extensive diagnostic information that HPE support often asks for
> when investigating hardware problems or reviewing support cases. These
> logs give detailed insights into hardware health and performance.
> Normally, only standard server logs are gathered, so activate this
> option if HPE support requests AHS logs specifically for case
> analysis.
>
> The **-Path** parameter allows you to specify the destination folder
> for the downloaded server logs. In the example above, we used a single
> period \".\" to indicate the current directory, so the logs will be
> saved locally. Since no custom filename was provided, the module
> automatically creates a file named in the format
> \"server-logs-\<servername\>-\<timestamp\>.zip\", making it easy to
> identify and organize logs for different servers and collection times.
> Please note that the log collection process may require 2 to 4 minutes
> to complete, as it compiles comprehensive diagnostic data from the
> server.

Once the task completes, the zip file can be found using:

**Get-ChildItem -Path . -Filter \*.zip \| Select-Object Name, Length,
LastWriteTime**

![](./media/image72.png){width="5.448676727909011in"
height="0.739686132983377in"}

If you want to see what\'s inside, you can use Windows Explorer to open
the zip file:

> ![](./media/image73.png){width="6.035593832020997in"
> height="2.4728280839895014in"}

Alternatively, you can use PowerShell's built-in **Expand-Archive**
cmdlet to extract the contents of the zip file. Simply run the following
by replacing the angle brackets with your server name, timestamp and
destination folder:

**Expand-Archive -Path .\\server-logs-**\< server name \>**-**\<
timestamp \>**.zip -DestinationPath .\\**\<folder name\>

This makes it easy to inspect individual log files and share relevant
data with support teams for further troubleshooting.

## Task 4 -- Enabling email notification

An essential aspect of effective server management is receiving timely
alerts when issues arise. To address this, COM provides configurable
email notification policies for each service instance as well as for
individual servers. In this step, you will establish an email
notification policy at the COM instance level, ensuring that whenever a
server is added to COM, the preferred email notification settings are
automatically applied.

To subscribe your user account to receive email
notifications---including service events, critical or warning severity
events, and daily summary updates---please execute the following
command:

**Enable-HPECOMEmailNotificationPolicy -Region \$Region -DailySummary
\`\
-ServiceEventAndCriticalAndWarningIssues**

![](./media/image74.png){width="7.3563265529308834in"
height="0.4569838145231846in"}

> > **📝 Note:** A service event refers to a failure that requires the
> > creation of an HPE support case and may necessitate a service
> > repair.

To review the current status of the email notification policy, use the
following command:

**Get-HPECOMEmailNotificationPolicy -Region \$Region**

![](./media/image75.png){width="6.432405949256343in"
height="0.5328587051618547in"}

# Step 9 -- Updating and Ensuring Server Firmware Compliance

This section outlines the procedures for configuring key server
management functions in COM. It covers maintaining server firmware
compliance to uphold security and performance standards, reviewing group
firmware deviations, and scheduling group firmware updates. Adhering to
these steps will enhance the efficiency of monitoring and maintaining
your server infrastructure.

## Task 1 -- Checking group firmware compliance 

The initial step in this process is to verify your group\'s firmware
compliance status. This compliance report provides a clear assessment of
how closely your servers align with the firmware baseline established
for your group. Not only does it indicate the number of components that
are out of compliance, but it also offers a detailed
breakdown---including the total download size required for all necessary
firmware updates. This comprehensive view is essential for understanding
the scope of updates needed and for planning any remediation actions
efficiently.

To check your group\'s current firmware compliance status, run this
command:

**Get-HPECOMGroup -Region \$Region -Name \$GroupName
-ShowFirmwareCompliance**

![](./media/image76.png){width="7.268055555555556in"
height="0.49444444444444446in"}

This command returns the following properties for the server:

**Server**: Server name

**SerialNumber**: Server serial number

**Group**: Group name the server belongs to

**State**: Compliance state (Compliant, Not Compliant, Unknown, etc.)

**Score**: Compliance score percentage (e.g., 25% indicates 25%
compliant)

**ErrorReason**: Reason for compliance failure if applicable

**Criticality**: Severity level of the firmware update (Recommended,
Critical, Optional)

**Deviations**: Number of firmware components that deviate from the
group\'s baseline

**WillItRebootTheServer**: Indicates if applying the update will reboot
the server (Yes/No)

**GracefullShutdownAttempt**: Indicates if a graceful shutdown will be
attempted before reboot (Yes/No)

**TotalDownloadSize**: Total size of firmware updates to download (e.g.,
65 MB)

> These properties describe the firmware compliance status of each group
> member. COM calculates the group compliance status by analyzing the
> group members for adherence to the server firmware settings configured
> in the group.
>
> > **🔔 Note:** You may achieve a perfect 100% compliance score with no
> > deviations depending on the status of your allocated server.

## Task 2 -- Checking group firmware deviations

Before updating the server firmware, you can examine any deviations in
firmware components from your group\'s established baseline. This step
allows you to accurately identify which specific components require
updates to align with the group definition. The components identified
for update correspond to the total firmware size of 65 MB, as indicated
in the TotalDownloadSize column of the firmware compliance report.

To view your group\'s firmware deviations, use:

**Get-HPECOMServer -Region \$Region -Name \$SN
-ShowGroupFirmwareDeviation**

![](./media/image77.png){width="5.709130577427821in"
height="0.9793033683289589in"}

This command returns the following properties for each firmware
component that deviates:

**ComponentName**: Name of the firmware component (e.g., System ROM,
NIC, Boot Controller)

**ExpectedVersion**: Firmware version expected by the group\'s baseline

**InstalledVersion**: Currently installed firmware version on the server

**ComponentFilename**: Filename of the firmware update package

   

> > ⚠️ **Note:** If there are no deviations, this command will not
> > return any response.
>
> > **🔔 Note:** The Firmware Compliance feature does not monitor HPE
> > driver and software versions.

## Task 3 -- Scheduling group firmware update

After identifying the firmware deviation within the group definition,
you may choose to perform a group firmware update. For this exercise,
however, you will instead create a scheduled task to initiate the
firmware update for all servers in your group during the upcoming
weekend (in four days).

> 🎯 **Note:** A live group firmware update will not be performed in
> this lab because of time constraints and the potential impact on
> servers used by other sessions. Thank you for your understanding.

To create a scheduled firmware update task, you need to use the
**Update-HPECOMGroupFirmware** cmdlet with the **-ScheduleTime**
parameter as shown below:

**Update-HPECOMGroupFirmware -Region \$Region -GroupName \$GroupName \`\
-AllowFirmwareDowngrade -InstallHPEDriversAndSoftware -ScheduleTime
(Get-Date).AddDays(4)\**

![](./media/image78.png){width="7.268055555555556in"
height="0.5354166666666667in"}

This update, scheduled in four days, allows firmware downgrades and
installs HPE drivers and software.

> > **📝 Note**: To benefit from HPE\'s drivers and software update
> > functionality, always make sure your servers fulfill the required
> > [prerequisites](https://support.hpe.com/hpesc/public/docDisplay?docId=sd00004003en_us&page=GUID-7D3436DF-F986-4910-AAC6-685CD5639A3F.html#ariaid-title1).

 To list all scheduled tasks, you can use:

**Get-HPECOMSchedule -Region \$Region**

There are several other important parameters with the
**Update-HPECOMGroupFirmware**:

The **ServerSerialNumber** parameter allows you to update only a
specific server within the group instead of updating all servers in the
group at once. Testing firmware updates on an individual server prior to
deploying them across the entire group is a recommended best practice.

By default, **Update-HPECOMGroupFirmware** runs updates in parallel
across eligible servers. The **SerialUpdates** parameter ensures that
only one server in the group updates at a time. This prevents all
servers from being offline simultaneously. When you combine
**SerialUpdates** with **StopOnFailure**, the update process stops
immediately if any server fails the firmware update, preventing further
servers from being updated until you investigate the issue.

The **PowerOffAfterUpdate** parameter automatically powers off servers
after a successful firmware update, which can be useful for data center
maintenance schedules or when you want to perform physical maintenance.

The **DisablePrerequisiteCheck** parameter bypasses prerequisite
validation checks before the update starts. Use this parameter only in
trusted environments where you have already verified that all
prerequisites are met, as skipping these checks can lead to failed
updates.

The **SkipComponentUpdatesThatAreBlockedByKnownIssues** parameter
automatically avoids updating specific firmware components that are
known to cause problems or issues in your environment.

The **Async** parameter returns control to your PowerShell prompt
immediately without waiting for the firmware update to complete. This is
useful when you want to schedule multiple operations or continue with
other tasks while the firmware updates run in the background.

# Step 10 -- Essential Next Steps for Server Management and Sustainability

After completing setup and firmware updates, the next essential steps
focus on ongoing server management and sustainability. Use HPE Compute
Ops Management PowerShell cmdlets to monitor server performance and
sustainability, generate utilization insights, and review energy
reports. Streamline authentication for accessing iLO interfaces by
implementing Single Sign-On (SSO), and confirm that your COM
configuration of iLO settings is correct through practical verification.

## Task 1 -- Server utilization insights

Server utilization insights play a crucial role in optimizing data
center efficiency and sustainability. Leveraging AI-powered analytics,
these insights provide detailed visibility into key performance metrics
such as CPU usage, memory utilization, bus activity, and I/O bus
performance. By continuously monitoring and analyzing server workloads,
administrators can proactively identify bottlenecks, balance resource
allocation, and make informed decisions to maximize both performance and
energy efficiency.

By default, COM automatically enables metrics data collection and
utilization alerts. This feature allows COM to gather essential metrics
for generating sustainability AI insights, creating utilization reports,
and issuing utilization alerts. To check the current configuration
status, you can run:

**Get-HPECOMMetricsConfiguration -Region \$Region**

![](./media/image79.png){width="4.79576990376203in"
height="0.6212139107611548in"}

COM metrics provides information on CPU, memory bus, and I/O bus usage.
These insights help organizations monitor and manage the performance of
their server infrastructure.

To view detailed CPU utilization insights for your server, use the
following command:

**Get-HPECOMServerUtilizationInsights -Region \$Region -SerialNumber
\$SN -CPUUtilization**

![](./media/image80.png){width="7.268055555555556in" height="0.5125in"}

> > **⚠️ Note**: Please be advised that server utilization insights are
> > [only]{.underline} for HPE ProLiant [Intel]{.underline} based
> > servers and the utilization insight data might [not]{.underline} be
> > available at this time.
>
> > ![](./media/image81.png){width="5.593886701662292in"
> > height="1.5970713035870516in"}
>
> > Since your server was only recently added to the COM instance, a
> > minimum of one day is required for sufficient data collection. The
> > screenshot is included to illustrate the anticipated output of the
> > cmdlets after several days of data collection.

By default, this cmdlet provides CPU utilization data for the past 90
days. If you want to customize the reporting period, add the
**LookbackDays** parameter. For example, to see CPU utilization insights
for the last 7 days, enter:

**Get-HPECOMServerUtilizationInsights -Region \$Region -SerialNumber
\$SN -CPUUtilization \`\
-LookbackDays 7**

> The cmdlet also offers several important metrics:

- MemoryBusUtilization

- IOBusUtilization

- CPUInterconnectUtilization

> These measurements give a broad view of your server\'s resource usage,
> allowing you to make smart choices that boost performance and
> efficiency.

## Task 2 -- Server sustainability insights

The Server Sustainability Insights feature is essential for enhancing
data center efficiency and promoting environmentally responsible
operations. In today's landscape, where sustainability is increasingly
prioritized, it's critical to monitor and optimize energy usage across
server infrastructure. Compute Ops Management (COM) offers comprehensive
sustainability insights by providing detailed reports on energy
consumption, carbon dioxide (CO2) emissions, and associated energy
costs.

These three report types---covering energy consumption, CO2 emissions,
and cost savings---empower organizations to assess, track, and manage
the environmental impact of their servers. With these insights, IT teams
can make data-driven decisions to reduce their carbon footprint and
operational expenses.

To access in-depth energy consumption data for a specific server, use
the following command:

**Get-HPECOMSustainabilityInsights -Region \$Region -SerialNumber \$SN
-EnergyConsumption**

![](./media/image82.png){width="7.268055555555556in"
height="0.6409722222222223in"}

By default, similar to the server utilization insights, this cmdlet
provides the total estimated figures for the previous 90 days.
Specifying your server's serial number ensures that the results are
focused on the server of interest.

> > **⚠️ Note**: Please be advised that sustainability insight data will
> > [not]{.underline} be available at this time. Since your server was
> > only recently added to the COM instance, a minimum of one day is
> > required for sufficient data collection.\
> > The screenshots are included to illustrate the anticipated output of
> > the cmdlets after several days of data collection.

If you want to view aggregate sustainability metrics for all servers
managed by your COM instance, use the following command:

**Get-HPECOMSustainabilityInsights -Region \$Region -EnergyConsumption**

> This screenshot illustrates the output generated by a COM instance
> operating with multiple servers:

![](./media/image83.png){width="7.268055555555556in"
height="1.4986111111111111in"}

The report provides the total estimated energy consumption (in
kilowatt-hours, kWh) for all servers in the specified region. The data
includes collected values from the past 90 days (3 months), as well as
projected consumption for the next 180 days (6 months) helping with
planning and decision-making.

To retrieve this summary specifically for the EU Central region, use:

**Get-HPECOMSustainabilityInsights -Region eu-central
-EnergyConsumptionTotal**

![](./media/image84.png){width="7.268055555555556in"
height="0.6131944444444445in"}

Additionally, you can explore other sustainability insights by modifying
the parameters:

- EnergyCost: Displays energy cost data for your servers.

- Co2Emissions: Provides information about carbon emissions.

  To extend your historical data analysis, you can look back up to 180
  days by using the **LookBackDays** parameter. For example, to estimate
  future CO2 emissions based on trends from the past 3 months, run:

**Get-HPECOMSustainabilityInsights -Region \$Region -Co2Emissions
-LookBackDays 180**

This command returns projected CO2 emissions, allowing you to better
assess and manage the environmental impact of your server operations.

## Task 3: Interacting with iLOs using Compute Ops Management SSO

Direct interaction with iLOs from this library is a key capability that
enhances server management efficiency. Starting in January 2025, Compute
Ops Management introduced support for single sign-on (SSO) access to
iLO, significantly streamlining the authentication process. This
advancement enables seamless integration with iLOs, allowing
administrators to perform a range of tasks---from executing native iLO
API RedFish commands to leveraging the HPEiLOCmdlets module for various
iLO operations. The following section outlines how to generate an iLO
access token and demonstrates several ways to interact with an iLO,
making day-to-day management tasks more intuitive and secure.

To authenticate to your server\'s iLO using single sign-on (SSO), follow
these 4 steps for clarity and precision:

Generate an iLO SSO Session Object

Run the following command to obtain a session object for SSO
authentication. Replace with your server\'s serial number and ensure
\$Region is set appropriately.

**\$SSOObject = Get-HPECOMServer -Region \$Region -Name \$SN \|
Get-HPECOMServeriLOSSO \`\
-GenerateXAuthToken -SkipCertificateValidation**

This command generates an SSO session object, which you'll use to
authenticate with HPEiLOCmdlets.

To view the details of the session object, enter:

**\$SSOObject\
\**
![](./media/image85.png){width="4.2006878827646545in"
height="0.6359601924759405in"}**\**

> > **⚠️ Note**: SSO is currently not supported by servers managed
> > through HPE OneView via HPE Compute Ops Management -- OneView
> > Edition (COM-OVE).

Install and import HPEiLOCmdlets

If not already installed, add the HPEiLOCmdlets module to your
environment and import it:

**Install-Module HPEiLOCmdlets**

**Import-Module HPEiLOCmdlets**

Connect to iLO Using the SSO Token

Use the following command to establish a connection to your iLO,
substituting with the appropriate IP address. The SSO token will be
passed from the session object.

**\$connection = Connect-HPEiLO -Address \$iLO_IP -XAuthToken
\$SSOObject.\"X-Auth-Token\" \`\
-DisableCertificateAuthentication**

If the connection is successful, no error message will be returned.

To verify the connection, inspect the \$connection object:

**\$connection**

![](./media/image86.png){width="6.943251312335958in"
height="0.9496719160104987in"}

Perform iLO Operations

With the established connection, you can now execute various iLO
management tasks. For example, to retrieve the iLO event log, use:

**(Get-HPEiLOEventLog -Connection \$connection).Eventlog**

These steps streamline the process of authenticating to iLO using
Compute Ops Management SSO and enable you to manage your servers more
efficiently with the PowerShell cmdlets.

## Task 4: Testing ILO settings configuration

In this task, you will verify that the iLO settings you configured in
your group (Step6 -- Task 1) have been correctly applied to your server.
Specifically, you will check the AcceptThirdPartyFirmwareUpdates
parameter, then change it and observe how COM detects the configuration
drift and re-applies the correct settings.

**\
Step 1**: Verify the current iLO firmware policy setting

Begin by querying the iLO directly with the HPEiLOCmdlets and your
connection object to check the current firmware update policy. Use the
following command to retrieve the firmware policy from your iLO:

**\$FirmwareUpdatePolicy = Get-HPEiLOFirmwarePolicy -Connection
\$connection**

**\$FirmwareUpdatePolicy.Accept3rdPartyFirmware**

**\$FirmwareUpdatePolicy**

![](./media/image87.png){width="3.994825021872266in"
height="1.0587620297462816in"}

This command should return **false**, indicating that the
AcceptThirdPartyFirmwareUpdates option is set to Disabled as per your
group's iLO policy. With this setting, installation of third-party
firmware on your server is blocked, aligning with recommended security
best practices.

**\
Step 2**: Simulate a configuration drift by changing the setting in COM

Now you will change the iLO setting in COM from ***Disabled*** to
***Enabled*** to simulate a configuration change. This will cause your
server to become non-compliant with the group\'s iLO policy. Run this
command to update the iLO setting:

**Set-HPECOMSettingiLOSettings -Region \$Region -Name \$iLOSettingName
\`\
-Description \"iLO Settings for AI Servers\" -VirtualMedia Enabled
-PasswordComplexity Enabled \`\
-WebServerSSL Enabled -AcceptThirdPartyFirmwareUpdates Enabled**

![](./media/image88.png){width="5.814021216097988in"
height="0.6595002187226596in"}

**\
Step 3**: Check the compliance status

After changing the setting, check the group\'s compliance status. You
should see that the iLO settings are now marked as not compliant because
the group policy expects Disabled but the setting now says Enabled:

**Get-HPECOMGroup -Region \$Region -Name \$GroupName -ShowCompliance**

![](./media/image89.png){width="6.261346237970254in"
height="0.55707239720035in"}

The compliance check will show that your server\'s iLO configuration no
longer matches the group\'s iLO policy.

**\
Step 4**: Re-apply the correct iLO configuration

Now you will use COM to re-apply the correct iLO configuration to your
server. This will change the **AcceptThirdPartyFirmwareUpdates**
parameter back to **Enabled** on the iLO itself. Run the following
command using the Async parameter so you don\'t have to wait for the job
to complete:

**\$task = Invoke-HPECOMGroupiLOConfiguration -Region \$Region
-GroupName \$GroupName \`\
-ServerSerialNumber \$SN -Async**

![](./media/image90.png){width="6.371341863517061in"
height="0.6696423884514435in"}

The command returns the job status, indicating that it is currently in a
Running state.

**Step 5**: Monitor the job progress

While the iLO configuration is being applied, you can check the job
status using these commands:

**Get-HPECOMJob -Region \$Region -Category Group -ShowRunning**

**Get-HPECOMJob -Region \$Region -Category Group -JobResourceUri
\$task.resourceUri**

![](./media/image91.png){width="7.268055555555556in"
height="0.5770833333333333in"}

**Get-HPECOMJob -Region \$Region -Category Group**

> ![](./media/image92.png){width="7.300925196850394in"
> height="0.8869783464566929in"}
>
> The job will take approximately 1 to 2 minutes to complete.
>
> ![](./media/image93.png){width="7.268055555555556in"
> height="0.7388888888888889in"}

**\
Step 6**: Verify the setting has been applied

Once the job is completed, query the iLO again to verify that
AcceptThirdPartyFirmwareUpdates has been changed back to Enabled on your
iLO:

**\$FirmwareUpdatePolicy = Get-HPEiLOFirmwarePolicy -Connection
\$connection**

**\$FirmwareUpdatePolicy.Accept3rdPartyFirmware**

**\$FirmwareUpdatePolicy**

![](./media/image94.png){width="3.923396762904637in"
height="1.0403608923884515in"}

This should now return \"**true**\" confirming that COM successfully
applied the new iLO configuration to your server.

**Key Learnings:**

- Methods for connecting to an iLO via SSO without the requirement of a
  dedicated iLO account.

- Techniques for directly querying iLO settings using HPEiLOCmdlets to
  verify current hardware configurations.

- Processes by which COM identifies configuration drift when group
  policies differ from server configurations.

- Use of Invoke-HPECOMGroupiLOConfiguration to re-apply relevant group
  policies to designated servers.

- Approaches for monitoring COM jobs in order to track the progress of
  configuration changes.

These points illustrate the effectiveness of COM's policy-based
management approach, enabling administrators to specify desired states
within group settings and allowing COM to automatically detect and
remediate configuration drift across servers.

# Step 11: Clean the lab for the next participant 

Before concluding the lab, follow these steps to clean up your
environment. Skipping these steps may leave resources locked to your
workspace, which could affect future lab sessions.

## Task 1: Remove your server from its service assignment

It is essential to remove a server from its current service assignment
before onboarding it to a different workspace. Failure to complete this
step will prevent successful reassignment of the server in another
environment.

Ensure you remove all devices from their service assignment by running:

**Get-HPEGLDevice \| Remove-HPEGLDeviceFromService**

![](./media/image95.png){width="6.195757874015748in"
height="0.6268569553805774in"}

Confirm that the server has been removed from its assignment by running:

**Get-HPEGLDevice -ShowRequireAssignment**

The expected response should show no more service and region
information:

![](./media/image96.png){width="5.968371609798775in"
height="0.4726771653543307in"}**\**

## Task 2: Remove the subscription key

Subscription keys are single-use on the HPE GreenLake platform, so it's
also important to delete your key from your workspace.

To delete your subscription key, run:

**Get-HPEGLSubscription \| Remove-HPEGLSubscription**

![](./media/image97.png){width="6.297801837270341in"
height="0.5355818022747156in"}

To verify that the subscription key has been removed, the following
command should return no response:

**Get-HPEGLSubscription\**

## Task 3: Remove the COM service instance

Next, remove the COM service instance (the **\$Region** you set earlier)
from your workspace. This will permanently remove all the COM resources,
logs and settings you set during this lab. This helps reduce unused
resources and lowers your carbon footprint.

To remove the COM service instance, enter:

**Get-HPEGLService -ShowProvisioned \| Remove-HPEGLService**

This action is permanent and cannot be undone. When you execute this
cmdlet, you will receive a warning at runtime explaining the
irreversible nature of the operation. The system will prompt you to
confirm your choice.

![](./media/image98.png){width="7.195075459317585in"
height="0.5194772528433945in"}

Type \"**Y**\" and press **Enter** to proceed with the removal

![](./media/image99.png){width="5.929829396325459in"
height="0.6425021872265967in"}

To verify that the COM service instance has been removed, the following
command should return no response:

**Get-HPEGLService -ShowProvisioned**

## Task 4: Disconnect from HPE GreenLake

The cleanup process is now complete. The final task, which cannot be
performed within the lab, is the deletion of the workspace itself. This
step can only proceed once all associated data---including devices and
users---has been removed from your workspace. These actions will be
carried out by our lab reset script following this session. Your final
responsibility is to disconnect from the HPE GreenLake platform, thereby
ending your session and deleting both the temporary API credentials
generated during connection and any related environment variables from
your command line terminal.

Begin by checking which HPE-related environment variables are still
active in your session. To do this, run the following command:

**Get-Variable -Name hpe\***

![](./media/image100.png){width="7.268055555555556in"
height="2.3243055555555556in"}

> After completing the removal of the COM service instance in the
> previous task, you will observe that variables such as HPECOMRegions
> are now empty. This confirms that the related resources have been
> successfully deleted from your environment.

To complete your session and disconnect from the HPE GreenLake platform,
enter:

**Disconnect-HPEGL\
\**
![](./media/image101.png){width="5.962155511811024in"
height="0.5988976377952756in"}

> This command will terminate your session, remove any temporary API
> credentials, and clear related environment variables from your command
> line terminal.

To ensure all environment variables have been cleared from your session,
run the following command one final time:

**Get-Variable -Name hpe\***

![](./media/image102.png){width="7.268055555555556in"
height="1.7395833333333333in"}

> This will display any remaining HPE-related variables. You may notice
> that several variables---such as HPEGreenLakeSession (session
> information), HPECOMInvokeReturnData (recent request output),
> HPEGLAPIClientCredentialName (API credentials created during login),
> and HPEGLworkspaces (workspace references)---are no longer present,
> confirming their successful removal.

# Step 12: Explore Zero Touch Automation with the Sample Script (Optional) 

If you would like to see the true value of this library, you can run the
Zero Touch Automation script available on GitHub:
<https://github.com/jullienl/HPE-COM-PowerShell-Library/blob/main/Examples/COM-Zero-Touch-Automation.ps1>.
This script offers complete end-to-end automation for everything you\'ve
accomplished in this lab, but this time through scripting. It
demonstrates the power of the library by automating the entire
lifecycle---from workspace provisioning and server configuration to
policy management and scheduling a firmware update---all in one go.
You'll receive results messages for each step, making it easy to track
progress.

Open Chrome and visit
<https://github.com/jullienl/HPE-COM-PowerShell-Library/blob/main/Examples/COM-Zero-Touch-Automation.ps1>

Click **Download raw file**.

> ![](./media/image103.png){width="7.268055555555556in"
> height="4.6090277777777775in"}

Chrome automatically saves the script to your desktop\'s download
folder; click **Show in folder**:

![](./media/image104.png){width="4.634010279965004in"
height="2.2086417322834646in"}

Then right-click the script and select **Open with Code**.

![](./media/image105.png){width="7.268055555555556in"
height="3.370833333333333in"}

Update these 5 variables using your HPE account information and team
details, which you can find in the lab's login sheet:

For **\$MyEmail**, at line 251**,** substitute the value with your HPE
account email you used earlier to connect to HPE GreenLake:

![](./media/image106.png){width="6.157109580052493in"
height="0.8126137357830271in"}

For **\$AdditionalUser**, at line 255, enter
[admin@hpelabs.us]{.underline} as shown below, replacing the existing
value:

![](./media/image107.png){width="4.750662729658792in"
height="1.3856102362204725in"}

For **\$SubscriptionKeys**, at line 278, delete the second key and add
the subscription key from the login sheet (make sure you remove the
comma at the end of the line):

![](./media/image108.png){width="5.344495844269466in"
height="1.2085017497812773in"}

For **\$Servers**, at lines 282+, substitute the value with your
server\'s details (iLO IP and iLO password) found in the login sheet and
remove the second server entry like below:

![](./media/image109.png){width="4.824225721784777in"
height="1.989180883639545in"}

For **\$ParkingLotWorkspace**, at line 343, substitute the value with
the name of your generated workspace. You may run **\$WorkspaceName** to
retrieve the name you configured previously

![](./media/image110.png){width="6.928050087489064in"
height="1.250174978127734in"}

After you finish changing the variable, save the file (**File** /
**Save**) and switch back to the PowerShell terminal.

![](./media/image111.png){width="7.268055555555556in"
height="3.897222222222222in"}

Navigate to the Download folder:

**cd Download**

Set the execution policy:

**Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process**

Run the script:

**.\\COM-Zero-Touch-Automation.ps1**

Enter your password when prompted.

![](./media/image112.png){width="4.308547681539808in"
height="1.6759459755030621in"}

After provisioning is finished, you can check how long it took.

![](./media/image113.png){width="4.299643482064742in"
height="4.060774278215223in"}

Then, press **Y** when prompted with \"Do you want to clean up the
environment now? (Y/N)\" to begin deprovisioning, which will remove
everything, even the newly created workspace.

![](./media/image114.png){width="4.725839895013124in"
height="2.90873031496063in"}

This completes the automation workflow, ensuring that your environment
is both provisioned and then properly cleaned up, leaving no residual
resources.

Leveraging this script with the PowerShell library for Compute Ops
Management (COM) dramatically accelerates and streamlines the resource
management process within the HPE GreenLake platform. Tasks that would
traditionally require manual intervention---such as provisioning,
configuration, and deprovisioning---are executed in a fraction of the
time, minimizing human error and operational delays. By automating these
critical steps, administrators can efficiently scale operations,
maintain consistency, and respond rapidly to changing business needs,
all while ensuring that resources are optimally utilized and securely
managed from start to finish.

With this final step complete, you have successfully concluded the
hands-on lab experience.

# Summary 

Throughout this lab, you explored how to automate server lifecycle
management using the HPE Compute Ops Management PowerShell module. You:

Installed the HPECOMCmdlets library and authenticated to HPE GreenLake.

Created a workspace, add a user, provision a COM instance, configure a
location, and install a subscription key.

Onboarded a server to COM using an activation key, assigned location and
tags, and verified device status.

Created configuration policies for BIOS, storage, firmware, and iLO,
then applied them through a server group.

Checked and enforced compliance, monitored jobs, and retrieved detailed
inventory, health, alerts, support, and warranty data.

Used COM SSO to access iLO, detected configuration drift, and
automatically re‑applied policy.

Explored firmware compliance, scheduled updates, utilization insights,
and sustainability metrics.

Finished by cleaning the lab: remove device assignments, delete
subscriptions, delete the COM instance, and disconnected.

Finally, executed the COM-Zero-Touch-Automation PowerShell script to
automate and streamline the entire configuration workflow---from
provisioning and policy application to deprovisioning---enabling
consistent, efficient, and error-free server management within the HPE
GreenLake platform.

Completing this lab provides you with a practical, end‑to‑end
understanding of automated server management, enabling faster
deployments, consistent configuration at scale, reduced manual effort,
and improved operational reliability. It equips you with skills to
streamline onboarding, enforce policy‑driven governance, automate
compliance, and leverage sustainability and utilization insights for
smarter infrastructure decisions.

# Want more?

**🚀** Looking to automate the onboarding of HPE servers into HPE
GreenLake and Compute Ops Management, see
[Onboarding-Script](https://github.com/jullienl/HPE-Compute-Ops-Management/blob/main/PowerShell/Onboarding/Prepare-and-Connect-iLOs-to-COM-v2.ps1).

**🚀** Looking to demonstrate the power of scripting with HPE GreenLake
and Compute Ops Management, see [HPE Compute Ops Management Zero Touch
Automation
Example](https://github.com/jullienl/HPE-COM-PowerShell-Library/blob/main/Examples/COM-Zero-Touch-Automation.ps1).
This script automates the entire lifecycle from workspace provisioning
through server configuration, policy management, and optional cleanup.
It showcases best practices for programmatic infrastructure deployment
and provides a foundation for building production-ready automation
workflows.

**🔔** Explore a variety of sample scripts designed for the Compute Ops
Management API, including Ansible playbooks, PowerShell, and Python
scripts. These resources offer practical examples to help automate and
streamline server management tasks. Visit the [GitHub
project](https://github.com/jullienl/HPE-Compute-Ops-Management).

**🛠️** Interested in using Ansible with COM? Visit this open source
[GitHub project](https://github.com/jullienl/HPE-COM-baremetal)
dedicated to server provisioning. Originally developed to support ESXi,
RHEL, and Windows Server platforms, the project demonstrates extensive
COM API capabilities---from initial setup (Day 0 operations), through
activation and configuration (Day 1), to ongoing management and
maintenance (Day 2), such as automated firmware updates.

**🖥️** When you\'re ready to dive deeper, schedule a personalized
session on the [HPE Demonstration
Portal](https://hpedemoportal.ext.hpe.com/).

**✨** You can also request a [90-day
evaluation](https://www.hpe.com/us/en/hpe-compute-ops-management.html?emodal=/us/en/greenlake/fragments/modal-fragment/uc-modal-form.fragment.html)
of Compute Ops Management to experience its full capabilities.

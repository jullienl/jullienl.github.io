---
layout: post
title:  "Configuring HPE GreenLake SSO SAML Authentication with ADFS"
date:   2023-08-22 18:42:45 +0200
categories: GreenLake
image: /assets/images/idp.jpg
excerpt: The goal of this post is to walk you through the steps required to configure ADFS as a SAML identity provider (IdP) for HPE GreenLake
---

**Contents**   
[SAML Authentication workflows](#SAMLAuthenticationworkflow)    
[Prerequisites](#prerequisites)   
[Step 1: Certificate Requirements for Federation Servers](#step1)   
[Step 2: Configuring an ADFS service user](#step2)   
[Step 3: Configuring AD user accounts and groups](#step3)   
[Step 4: Inviting an AD administrator user to HPE GreenLake](#step4)   
[Step 5: ADFS installation](#step5)   
[Step 6: ADFS configuration](#step6)   
[Step 7: Configuring ADFS for iDP-initiated SSO](#step7)   
[Step 8: HPE GreenLake configuration for SAML federation](#step8)   
[Step 9: Collecting the HPE GreenLake SAML attributes values](#step9)   
[Step 10: Adding HPE GreenLake as an ADFS relying party trust](#step10)   
&nbsp;&nbsp;&nbsp;[Step 10.1: LDAP Attributes Mappings](#step10.1)   
&nbsp;&nbsp;&nbsp;[Step 10.2: Attribute to identify users](#step10.2)   
&nbsp;&nbsp;&nbsp;[Step 10.3: Roles and permission attribute](#step10.3)   
[Testing step 1: Testing the ADFS sign on page](#testingADFSsignonpage)   
[Testing step 2: SP-Initiated test authentication](#SPInitiatedtest)   
[Testing step 3: iDP-Initiated test authentication](#iDPInitiatedtest)   
[Troubleshooting SAML connectivity errors](#troubleshooting)   


# Introduction

In this blog post, I will walk you through the steps required to configure Microsoft Active Directory Federation Services as a SAML identity provider (IdP) for [HPE GreenLake](https://www.hpe.com/us/en/greenlake.html) and [HPE Compute Ops Management](https://www.hpe.com/us/en/hpe-greenlake-compute-ops-management.html). 

The motivation for using LDAP as a source for user/group information for HPE GreenLake is primarily driven by three factors:

- **Integration with existing Active Directory (AD) infrastructure**: The need for end customers to have their AD integrated with HPE GreenLake Identity & Access Management (IAM) creates a single source of truth for user/group information. Any changes made to user/group information in AD, such as adding or removing users from groups, or adding/removing users from organizations, are replicated to the HPE GreenLake IAM system through mechanisms like System for Cross-domain Identity Management (SCIM) provisioning.

- **Simplification of synchronization processes**: By using LDAP as a source for user/group information, the need for manual processes to synchronize this information across different systems is greatly reduced. This streamlines the management of user/group data and eliminates potential inconsistencies that can arise from manual synchronization.

- **Convenience for end users and improved security**: With the spread of cloud-hosted Saas applications, users have to memorize a long list of passwords, which can lead to compromise, lost productivity and security breaches, as users will end up using easy-to-remember passwords. By having a single set of LDAP credentials, end users can access multiple systems seamlessly. This eliminates the need to remember and manage different sets of credentials for different systems, thereby improving user convenience, productivity and security.

[Active Directory Federation Services](https://learn.microsoft.com/en-us/windows-server/identity/) (ADFS), which is a feature of Windows servers, allows users to use their Active Directory (AD) credentials to authenticate themselves to trusted resources on external networks such as the HPE GreenLake edge-to-cloud platform. This functionality is commonly referred to as a single sign-on (SSO) service.

Unlike Azure AD, the Microsoft cloud-native IAM service, ADFS utilizes your existing local Active Directory instance for single sign-on (SSO) functionality. It operates similarly to other SSO services, but instead of relying on a third-party SSO tool, you leverage your own local Active Directory for authentication and authorization purposes.

<a name="SAMLAuthenticationworkflow"></a>

## SAML Authentication workflows

The following diagrams describe the SAML authentication workflow used by HPE GreenLake when ADFS is used as the identity provider.

### Service Provider initiated SSO

In an initiated Service Provider SSO workflow, the SSO request originates from the service provider i.e. HPE GreenLake. When a user tries to access HPE GreenLake, a federation authentication request is created and sent to the ADFS server:

![HPE GreenLake login page]( {{ site.baseurl }}/assets/images/AD-ADFS-00.png)

1. A user accesses the HPE GreenLake UI and enters their primary email address in the SSO interface.
2. HPE GreenLake generates a SAML 2.0 AuthN request and redirects the user's browser to the ADFS sign on page.
3. When a user is not yet authenticated with ADFS, they will be prompted to authenticate. However, if the user is already authenticated with ADFS, they will not be required to authenticate again.
4. ADFS authenticates the user against the Active Directory.
5. Once the user is authenticated a SAML response is generated by ADFS and posted back to HPE GreenLake via the user's browser.
6. HPE GreenLake verifies the SAML response.
7. The authentication process completes, and the user is granted access to the HPE GreenLake application.


### Identity Provider initiated SSO

In an Identity Provider SSO workflow, the SSO request originates from the identity provider i.e. ADFS. Users access to a specific ADFS encoded URL which contains the HPE GreenLake SSO URL, and enter their Active Directory credentials. Then ADFS creates a SAML response and redirects the users to HPE GreenLake user interface:

![HPE GreenLake login page]( {{ site.baseurl }}/assets/images/AD-ADFS-01.png)

1. A user accesses the ADFS encoded URL sign on page 
2. The user enters their Active Directory credentials.
3. ADFS authenticates the user against the Active Directory.
4. ADFS generates a SAML assertion which is sent to the selected HPE GreenLake application via the user's browser.
5. HPE GreenLake accepts the request, establishes who the identity of the user from the NameID element of the SAML assertion, discovers the user's effective roles in the hpe_ccs_attribute element
6. The authentication process completes, and the user is granted access to the HPE GreenLake application encoded in the ADFS url as known as the RelayState.

<a name="configurationsteps"></a>

# Configuration steps

<a name="prerequisites"></a>


## Prerequisites

1. Subscribe to HPE GreenLake from your organization, see [Sign up with HPE GreenLake](https://common.cloud.hpe.com/) 
2. Make sure you have an admin role for HPE GreenLake
3. An Active Directory instance
4. A server running Microsoft Windows Server 2022 (or 2016)
    
<a name="step1"></a>

## Step 1: Certificate Requirements for Federation Servers

Active Directory Federation Services (ADFS) requires a certificate for Secure Socket Layer (SSL) server authentication on each federation server in your federation server farm so before you start the ADFS installation, you need to meet two important requirements:

1. Ensure that a trusted certificate is installed on the Windows server. This certificate is used to secure the communication and facilitate user authentication between HPE GreenLake and the federation server(s). You must have both the certificate and its private key available. Microsoft recommends not to use self-signed certificates for this certificate.
   
   ![]( {{ site.baseurl }}/assets/images/AD-ADFS-cert.png){:class="body-image-post"}

   > See [Certificate Requirements for Federation Servers](https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/design/certificate-requirements-for-federation-servers) and [Enroll an SSL Certificate for AD FS](https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/deployment/enroll-an-ssl-certificate-for-ad-fs)
    > 
    > **Note**: In my environment, I use the [Acme](https://docs.netgate.com/pfsense/en/latest/packages/acme/index.html) package in pfsense to automatically generate every 60 days (Let's Encrypt certificates expire after 90 days) a free [Let's Encrypt](https://letsencrypt.org/) signed certificate for my domain. 
    >
    > I also use the **Write Certificates** Acme option to save my signed certificate in the **/cf/conf/acme** folder of pfsense:
    >
    ![]( {{ site.baseurl }}/assets/images/pfsense-ACME-1.png){:class="citation-image-post"}
    >
    > - For the initial ADFS configuration (so before you run the Step 6: ADFS configuration), a p12 certificate must be generated from the certificate files supplied by the Acme package. The following command can be run from a pfsense shell console:      
    > `openssl pkcs12 -export -in /cf/conf/acme/<name>.all.pem -inkey /cf/conf/acme/<name>.key -out /cf/conf/acme/<name>.p12 -passout pass:password -name <name>.com -caname root`    
    > Then to import the p12 certificate into ADFS, open the Start menu on the ADFS server and search for **Manage Computer Certificates** then import the p12 file available in pfsense in /cf/conf/acme into the Personal store. 
    >
    > - Then once ADFS is installed, a scheduled [script](https://github.com/jullienl/HPE-GreenLake/blob/main/ADFS/Renew-ADFS-certificate.ps1) can be run every 60 days (so before the Let's Encrypt certificate expires) to import the Let's Encrypt certificate from pfsense into ADFS and then to restart the ADFS services.


2. Ensure that the Fully Qualified Domain Name (FQDN) of your certificate is correctly mapped to the public IP address of your ADFS server.

    > **Note**: I use [Dynu DNS](https://www.dynu.com) to register my domain name but there are many free dynamic DNS services available.   
    >
    > In my environment, I use my pfsense's public IP address because I use pfsense HAproxy to publish ADFS. See Andreas Helland's excellent article: [Publishing ADFS through pfSense with HAProxy](https://contos.io/publishing-adfs-through-pfsense-with-haproxy-e5c86fc4b5e1)
 
<a name="step2"></a>

## Step 2: Configuring an ADFS service user 

From the **Active Directory Users and Computers**, create a new Active Directory (AD) user account:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-1.png){:class="body-image-post"}

You can name it **adfssvc**:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-2.png){:class="body-image-post"}

Add admin right to **adfssvc**

![]( {{ site.baseurl }}/assets/images/AD-ADFS-3.png){:class="body-image-post"}

<a name="step3"></a>

## Step 3: Configuring AD user accounts and groups

The idea for users and groups is to create two AD user accounts to illustrate how roles and privileges works between ADFS and HPE GreenLake, so you will create a first user account with a read-only role and another with a full administrator role.

So create a first AD user account, for example Mike, for the Observer role on the HPE GreenLake platform, this will include both HPE Compute Ops Management and HPE GreenLake roles:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-4.png){:class="body-image-post"}

> **Note**: Ensure to provide the e-mail address of the external domain name in the E-mail field! This is important because the user will be authenticated on the HPE GreenLake platform by this e-mail address.

Then create a second AD user account for the Administrator role: 

![]( {{ site.baseurl }}/assets/images/AD-ADFS-5.png){:class="body-image-post"}

The next step is to create two AD groups. 

Create a first group **GLCP-Admins** for the Administrator role:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-6.png){:class="body-image-post"}

and a second group **GLCP-Observers** for the Observer role:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-7.png){:class="body-image-post"}

Then add **Lionel** to the **GLCP-Admins** group:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-8.png){:class="body-image-post"}

And add **Mike** to the **GLCP-Observers** group:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-9.png){:class="body-image-post"}

<a name="step4"></a>

## Step 4: Inviting an AD administrator user to HPE GreenLake

The configuration of HPE GreenLake SAML SSO requires at least one verified user from the SAML domain you want to claim.  For example, to claim an acme.com domain, the user must be logged in to HPE GreenLake with an @acme.com email address.

So if you are not connected to HPE GreenLake with an email from your SAML domain, do so now. 

> **Note**: If you haven't yet added a user from your SAML domain to the HPE GreenLake platform, you can send an invitation from **Manage** / **Identity & Access** / **Invite Users**:
>
>  ![]( {{ site.baseurl }}/assets/images/AD-ADFS-10.png){:class="citation-image-post"}
>
> Enter the email address associated with your AD user account and select the **Account Administrator** role: 
>
>  ![]( {{ site.baseurl }}/assets/images/AD-ADFS-11.png){:class="citation-image-post"}
>
> **Note**: The administrator role will be needed to configure SAML authentication in your workspace, which will be done later. 
>
> Then click on **Send Invite**. This will send an email invitation to the mailbox of your AD user. 
> 
> ![]( {{ site.baseurl }}/assets/images/AD-ADFS-12.png ){:class="body-image-post"}{:width="50%"}
>
> Accept the invitation by clicking on the **Accept invitation** button and complete the HPE GreenLake registration.


<a name="step5"></a>

## Step 5: ADFS installation

The next step is to install Active Directory Federation Services role on the Windows Server. 

> **Note**: In my environment, I use a Windows Server 2022.

Open the **Add Roles and Features Wizard** and select the **Active Directory Federation Services** role:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-13.png){:class="body-image-post"}

Keep all default settings until you reach the confirmation section:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-14.png){:class="body-image-post"}

Then click on **Install**.

When the installation is complete, click on **Configure the federation service on this server**.

![]( {{ site.baseurl }}/assets/images/AD-ADFS-15.png){:class="body-image-post"}

<a name="step6"></a>

##  Step 6: ADFS configuration

In the new window, select **Create the first federation server in a federation server farm** then click **Next**:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-16.png){:class="body-image-post"}

Select an AD user account with administrative privileges then click **Next**:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-17.png){:class="body-image-post"}

Select the certificate associated with your external domain name for your federation services. Note that the Federation service name should be automatically generated from the selected certificate. 

> **Note**: This is where the initial import of the trusted certificate into the ADFS server takes place, as described in step 1.
    
![]( {{ site.baseurl }}/assets/images/AD-ADFS-18.png){:class="body-image-post"}

> **Note**: If you don't see your trusted public certificate in the dropdown list, make sure you've followed all the recommendations in step 1.

Enter the display name of the federation service. This is the name that will be display on the ADFS sign in web page, so you can enter any name you like.

![]( {{ site.baseurl }}/assets/images/AD-ADFS-19.png){:class="body-image-post"}

In the next page, click on **Select** to select the AD account we created earlier for the ADFS service:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-20.png){:class="body-image-post"}

Enter the **adfssvc** account:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-21.png){:class="body-image-post"}

Enter the password that you defined earlier:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-21-1.png){:class="body-image-post"}

On the next page, if you have a SQL server, provide the SQL details or select **Create a database on this server using Windows Internal Database**:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-22.png){:class="body-image-post"}

On the next page, a summary of the ADFS options is display, click **Next**:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-23.png){:class="body-image-post"}

Once the prerequisites checks are complete, click **Configure**:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-24.png){:class="body-image-post"}

In the results page, you might have a few warnings. You can then close the wizard. Note that a restart might be needed after the installation.

> **Note**: If you get an SPN error message, you can run the following command from a PowerShell console:    
```bash
setspn -a host/localhost <service-account>
```    
> where *\<service-account\>* corresponds to **adfssvc** in our case. 

AD FS service should be running now, make sure the status is *online* in the Server Manager console:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-25.png){:class="body-image-post"}

The last step is to download the ADFS server's federation metadata XML that will be imported later in the HPE GreenLake platform. You can use the following URL from the ADFS server:

**https://localhost/federationmetadata/2007-06/federationmetadata.xml** 

Save the file as *ADFS_federation_metadata.ping.xml* and keep it for later.

<a name="step7"></a>

## Step 7: Configuring ADFS for iDP-initiated SSO 

By default ADFS is not configured for RelayState, a parameter of the SAML federation protocol which is required for iDP-initiated SSO.

> For more information, see [Enable the Idp-initiated sign on page](https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/troubleshooting/ad-fs-tshoot-initiatedsignon) and [AD FS 2.0 RelayState](https://learn.microsoft.com/en-us/archive/blogs/askds/ad-fs-2-0-relaystate)

> If you don't enable RelayState and don't use the special encoded url with *RelayState*, you will get the following error from HPE GreenLake when using the iDP-initiated SSO:   
> 
> ![]( {{ site.baseurl }}/assets/images/AD-ADFS-25-1.png){:class="body-image-post"}{:width="50%"}


There are two steps to this configuration:

1. Enabling RelayState for iDP-Initiated SSO in ADFS:
   
   You need to run the following Powershell command from the ADFS server to enable RelayState for iDP-Initiated SSO:
   
	```powershell
	Set-AdfsProperties -EnableRelayStateForIdpInitiatedSignOn $True
	```
	> **Note**: To see the current status of *EnableRelayStateForIdpInitiatedSignOn*, you can use:

     ```powershell
     Get-adfsproperties | select RelayStateForIdpInitiatedSignOnEnabled
     ```

2. Building the URL required at the ADFS sign on page:
	
   In addition, RelayState requires an encoded URL for the iDP-initiated login. To generate this encoded URL, you can use an ADFS RelayState generator tool such as [https://jackstromberg.com/adfs-relay-state-generator/](https://jackstromberg.com/adfs-relay-state-generator/) using the following URLs:
   - *IDP URL String*: **https://\<FQDN\>/adfs/ls/IdPInitiatedSignon.aspx** with *\<FQDN\>* the fully qualified domain name (FQDN) host name of your ADFS server.
 <br/>

   - *Relying Party Identifier*: **https://sso.common.cloud.hpe.com**
 <br/>
  
   - For *Relay State*, you can use different URL depending on your needs:   
       - **https://common.cloud.hpe.com** if you want to get to the HPE GreenLake home page.
       - Any HPE GreenLake application such as **https://us-west2.compute.cloud.hpe.com** if you want for example get to the US-West Compute Ops Management home page.
 <br/>
 <br/>

   > **Note**: If you use **https://us-west2.compute.cloud.hpe.com** as the RelayState, after logging on, you will be redirected to the home page of Compute Ops Management.
   >
   > **Note**: It is not recommended to use an application RelayState if you have more than one application on the HPE GreenLake platform.     
    
   ![]( {{ site.baseurl }}/assets/images/AD-ADFS-25-2.png){:class="body-image-post"}{:width="80%"}

   Your encoded URL will then look like:     
	```
   https://\<FQDN\>/adfs/ls/IdPInitiatedSignon.aspx?RelayState=RPID%3Dhttps%253A%252F%252Fsso.common.cloud.hpe.com%26RelayState%3Dhttps%253A%252F%252Fcommon.cloud.hpe.com%252F
   ```
	Later, in the [Testing](#testing) section, you'll test your iDP-initiated SSO settings.


<a name="step8"></a>

## Step 8: HPE GreenLake configuration for SAML federation

Now it's time to configure your HPE GreenLake environment for SAML SSO authentication. Log in to the HPE GreenLake platform using your AD administrative user account (i.e. lionel@\<your_domain_name.com\> created above).

![]( {{ site.baseurl }}/assets/images/AD-GLCP-1.png){:class="body-image-post"}{:width="50%"}

Then go to **Manage** / **Authentication**

> **Important note**: If you have several workspaces defined on the platform and wish to configure SAML SSO for each of them, you need to run this SAML configuration procedure on each workspace.

![]( {{ site.baseurl }}/assets/images/AD-GLCP-2.png){:class="body-image-post"}

Click on **Set Up SAML Connection** to set up your workspace for SAML.

![]( {{ site.baseurl }}/assets/images/AD-GLCP-3.png){:class="body-image-post"}

Enter your domain name:

![]( {{ site.baseurl }}/assets/images/AD-GLCP-4.png){:class="body-image-post"}

Then select the **Metadata File** method and upload the Federation Metadata XML file *ADFS_federation_metadata.ping.xml* from the previous section.

![]( {{ site.baseurl }}/assets/images/AD-GLCP-5.png){:class="body-image-post"}

Then use the following configuration settings:

![]( {{ site.baseurl }}/assets/images/AD-GLCP-6.png){:class="body-image-post"}

> **Note**: The *NameID* attribute is used to identify the user. This is usually a unique identifier, such as a username or e-mail address. For HPE GreenLake, the platform uses the e-mail address to identify a user.
 
> **Note**: *hpe_ccs_attribute* is a mandatory attribute which is used to represent the user's roles and permissions. For example, a user might have the role of "administrator" or "observer" in the HPE GreenLake platform for certain applications in different workspaces. 
>
> **Note**: The first and last name are optional attributes. If they are not defined, the users in the HPE GreenLake user account details will appear with *Unknown* first name and *Unknown* last name.
>
> **Note**: You can also change the SAML idle session timeout to a different time. 60 minutes is the default time a user can be inactive before the session ends.

Create a recovery user per the instructions

![]( {{ site.baseurl }}/assets/images/AD-GLCP-7.png){:class="body-image-post"}

Validate the settings are correct:

![]( {{ site.baseurl }}/assets/images/AD-GLCP-8.png){:class="body-image-post"}

Then click on **Finish** to save the configuration.

Finally click on **Download Metadata File** and save the file as *HPE_GreenLake_federation_metadata.ping.xml*.

![]( {{ site.baseurl }}/assets/images/AD-GLCP-9.png){:class="body-image-post"}

> **Note**: If you configure SAML Federation for more than one workspace, it is not necessary to save this file for each workspace, as only one workspace metadata file is required.

You should now have a new SAML configuration available on your Authentication page:

![]( {{ site.baseurl }}/assets/images/AD-GLCP-10.png){:class="body-image-post"}

<a name="step9"></a>

## Step 9: Collecting the HPE GreenLake SAML attributes values

Once you have finished configuring HPE GreenLake for SAML federation, you need to record the various SAML attribute values that will be required in step 9 to build the user’s roles and permissions using the *hpe_ccs_attribute* as part of the group membership claim rules in ADFS.

Click the ellipsis of your SAML SSO configuration and select **View SAML Attribute** to display SAML attributes values.

![]( {{ site.baseurl }}/assets/images/AD-GLCP-11.png){:class="body-image-post"}

You must record:
- The HPE GreenLake platform Customer ID for each workspace you own 
  > **Note**: This name is misleading, but it represents the workspace ID, which is therefore unique for each workspace

- The ID of each application you wish to access from your AD users. Note that the HPE GreenLake platform ID is always 00000000-0000-0000-0000-000000000000 
> **Note**: These application ID are identical for all workspaces. 

![]( {{ site.baseurl }}/assets/images/AD-GLCP-12.png){:class="citation-image-post"}

<a name="step10"></a>

## Step 10: Adding HPE GreenLake as an ADFS relying party trust 

The next step involves configuring HPE GreenLake as a relying party trust in ADFS. Open the **AD FS Management** console: 

![]( {{ site.baseurl }}/assets/images/AD-ADFS-26.png){:class="body-image-post"}

And click on the **Add Relying Party Trust** actions from the **Relying Party Trusts** folder:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-27.png){:class="body-image-post"}

One the welcome page, select **Claims aware**:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-28.png){:class="body-image-post"}

Select **Import data about relying party from a file** and provide the location of the *HPE_GreenLake_federation_metadata.ping.xml* file downloaded at step 7.

![]( {{ site.baseurl }}/assets/images/AD-ADFS-29.png){:class="body-image-post"}

Enter a name for the relying party such as *HPE GreenLake*:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-30.png){:class="body-image-post"}

Then select **Permit everyone**:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-31.png){:class="body-image-post"}

Click **Next**:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-32.png){:class="body-image-post"}

Then make sure **Configure claims issuance policy for this application** is selected then click **Close**:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-33.png){:class="body-image-post"}

### Claim Issuance Policy

Once the *HPE GreenLake* relying party has been created, you'll need to create the claim issuance policies, right click on *HPE GreenLake* and select **Edit Claim Issuance Policy**:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-34.png){:class="body-image-post"}

<a name="step10.1"></a>

#### LDAP Attributes Mappings

The first step required for SAML authentication with HPE GreenLake is the definition of the mapping, known as a *Send LDAP Attributes as Claims* rule in ADFS, which defines the mapping between the various LDAP attributes (e.g. first name, last name, e-mail-addresses) and the outgoing claim types supported by HPE GreenLake (e.g. name, e-mail address, optional attributes, etc.).

To create this rule, click **Add Rule**:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-35.png){:class="body-image-post"}

Then select **Send LDAP Attributes as Claims**:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-36.png){:class="body-image-post"}

Enter a name such as *HPE_GreenLake_Rules* and select **Active Directory** for *Attribute store* then enter the following attributes:

| LDAP Attribute       | Outgoing Claim Type | 
| :------------------- | :------------------ |
|  Give-Name           | gl_first_name       |
|  Surname             | gl_last_name        |
|  Give-Name           | Name                |
|  E-Mail-Addresses    | E-Mail Address      |

> **Note**: *gl_first_name* and *gl_last_name* are optional. If you do not configure them, the users in the HPE GreenLake user account details will appear with *Unknown* first name and *Unknown* last name.


![]( {{ site.baseurl }}/assets/images/AD-ADFS-37.png){:class="body-image-post"}

> **Note**: These settings should match the **First Name** and **Last Name** attributes set in the HPE GreenLake SAML configuration at step 7.
>   
> ![]( {{ site.baseurl }}/assets/images/AD-ADFS-37-1.png){:class="citation-image-post"}

Then click **Finish** to save this new rule.

<a name="step10.2"></a>

#### Attribute to identify users

The next rule is to define the e-mail address as the SAML attribute *NameID* used on the HPE GreenLake platform to identify a user. In other words, it is necessary to define the e-mail address defined in the Active Directory user account as the user name (Name ID) for logging on to HPE GreenLake. 

To do this, create a new rule by clicking **Add Rule**, this time selecting **Transform an Incoming Claim as the template**:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-38.png){:class="body-image-post"}

On the next screen:

1. Enter a name such as *Email_Transform*
2. Select **E-mail Address** as the *Incoming Claim Type*.
3. For *Outgoing Claim Type*, select **Name ID**
4. For *Outgoing Name ID Format*, select **Email**
5. Leave the rule to the default of **Pass through all claim values**

   ![]( {{ site.baseurl }}/assets/images/AD-ADFS-39.png){:class="body-image-post"}


Click on **OK** to save this new rule.

<a name="step10.3"></a>

#### Roles and permission attribute

The next step is to define roles and permissions using the *hpe_ccs_attribute* HPE GreenLake attribute.
This operation creates a user role mapping rule for the various HPE GreenLake applications with an existing Active Directory security group (i.e. *GLCP-Admins* created earlier at step 3). This will allow you to define, for example, that the **GLCP-Admins** group will have administrator rights for the GreenLake application and for the Compute Ops Management application while the **GLCP-Observers** group will have only read roles on both.

To create the first rule for the administrators, click again on **Add Rule** but this time select **Send Group Membership as Claim** as the template:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-40.png){:class="body-image-post"}

On the next screen:

1. Enter a rule name such as *GLCP_Admins_group* 
2. Select the AD group **GLCP-Admins**: 
   
   ![]( {{ site.baseurl }}/assets/images/AD-ADFS-41.png){:class="body-image-post"}

3. For the *Outgoing claim type*, enter **hpe_ccs_attribute**

   ![]( {{ site.baseurl }}/assets/images/AD-ADFS-42.png){:class="body-image-post"}

    > **Note**: This name should match the **HPE GreenLake Attribute** sets in the HPE GreenLake SAML configuration at step 7.
    > 
    > ![]( {{ site.baseurl }}/assets/images/AD-ADFS-43.png){:class="body-image-post"}


**Building *hpe_ccs_attribute* value**

For the **Outgoing claim value**, there is a special SAML format that must be used to define the HPE GreenLake platform's roles and permissions using  *hpe_ccs_attribute*. 

> ![]( {{ site.baseurl }}/assets/images/AD-ADFS-42-1.png){:class="body-image-post"}

It must comply with the following SAML attribute format:
{% highlight shell %}
version_1#{workspace_id}:{application_id}:{role_name}:{resource_restriction_policy_name}
{% endhighlight %}

**SAML Syntax**

| Syntax | Description          |
| :-----| :---------------------|
| workspace_id | Workspace ID found in **Manage** tab. If you have several workspaces, define the attributes separately for each workspace ID with a hash (#) delimiter. |
| application_id | Application ID found in **Manage** / **Authentication** / **...** / **View SAML Attributes**. If you have several applications, define the attributes separately for each application ID with a colon (:) delimiter.|
| role_name | Role name (or access level) for a particular application ID. Defines the user's roles. Role names are found in **Manage** / **Identity & Access** / **Roles & Permissions**.|
| resource_restriction_policy_name | Resource restriction policy name (RRP). Defines the user's permissions. When a RRP is specified, the user can only manage the devices in that RRP group and can read-only all other resources. RRPs are found in **Manage** / **Identity & Access** / **Resource Restriction Policies**. If not defined, then by default **resource_restriction_policy_name** is set to **ALL_SCOPES** which means you are not restricted by a resource restriction policy.|


- With several applications, you can define each application ID with a colon (:) delimiter, such as:

{% highlight shell %}
version_1#{workspace_id}:{application_id_1}:{role_name}:{resource_restriction_policy_name}:{application_id_2}:{role_name}:{resource_restriction_policy_name}
{% endhighlight %}

- With several workspaces, you can define each workspace ID with a hash (#) delimiter, such as:

{% highlight shell %}
version_1#{workspace_id_1}:{application_id}:{role_name}:{resource_restriction_policy_name}#{workspace_id_2}:{application_id}:{role_name}:{resource_restriction_policy_name}
{% endhighlight %}

 
   > **Note**: With several workspaces, you don't add another relying party trust in ADFS but instead you modify the existing one by adding an additional workspace definition in **hpe_ccs_attribute**.
   >
   > Adding a relying party trust for an additional HPE GreenLake workspace in ADFS when one already exists, returns the following error message: "MSIS7612: Each identifier for a relying party trust must be unique across all relaying party trusts in AD FS configuration.". So it is required to modify the existing HPE GreenLake relying party trust as indicated above. 
   >
   > ![]( {{ site.baseurl }}/assets/images/AD-ADFS-44.png){:class="body-image-post"}


- With multiple workspaces and multiple applications:
{% highlight shell %}
version_1#{workspace_id_1}:{application_id_1}:{role_name}:{resource_restriction_policy_name}:{application_id_2}:{role_name}:{resource_restriction_policy_name}#{workspace_id_2}:{application_id_1}:{role_name}:{resource_restriction_policy_name}:{application_id_2}:{role_name}:{resource_restriction_policy_name}
{% endhighlight %}
      
**Where can I find the different values of these fields?** 

To substitute your own custom value for `{workspace_id}` and `{application_id}`, refer to your workspace IDs and application IDs previously recorded in step 8 on the HPE GreenLake platform. 

Then for:

- `{Role_name}`: found in the HPE GreenLake interface in **Manage** / **Identity & Access** / **Roles & Permissions**.
  
  ![]( {{ site.baseurl }}/assets/images/AD-ADFS-44-1.png){:class="body-image-post"}

  As illustrated above, the administrative role name for Compute Ops Management is *Administrator* but *Account Administrator* for the HPE GreenLake platform.

- `{resource_restriction_policy_name}`: found in **Manage** / **Identity & Access** / **Resource Restriction Policies**.
  
  ![]( {{ site.baseurl }}/assets/images/AD-ADFS-44-2.png){:class="body-image-post"}



**hpe_ccs_attribute real values examples** 

- For one workspace and two applications (HPE GreenLake and Compute Ops Management) with administrative privileges:
{% highlight shell %}
version_1#248aa396805c11ed88e216588ab64ce9:00000000-0000-0000-0000-000000000000:Account Administrator:ALL_SCOPES:b394fa01-8858-4d73-8818-eadaf12eaf37:Administrator:ALL_SCOPES
{% endhighlight %}

- For two workspaces and two applications (HPE GreenLake and Compute Ops Management) with administrative privileges:
{% highlight shell %}
version_1#248aa396805c11ed88e216588ab64ce9:00000000-0000-0000-0000-000000000000:Account Administrator:ALL_SCOPES:b394fa01-8858-4d73-8818-eadaf12eaf37:Administrator:ALL_SCOPES#34652ff0317711ec9bc096872580fd6d:00000000-0000-0000-0000-000000000000:Account Administrator:ALL_SCOPES:b394fa01-8858-4d73-8818-eadaf12eaf37:Administrator:ALL_SCOPES
{% endhighlight %}

- For two workspaces and two applications (HPE GreenLake and Compute Ops Management) with read only privileges:

{% highlight shell %}
version_1#248aa396805c11ed88e216588ab64ce9:00000000-0000-0000-0000-000000000000:Observer:ALL_SCOPES:b394fa01-8858-4d73-8818-eadaf12eaf37:Observer:ALL_SCOPES#34652ff0317711ec9bc096872580fd6d:00000000-0000-0000-0000-000000000000:Observer:ALL_SCOPES:b394fa01-8858-4d73-8818-eadaf12eaf37:Observer:ALL_SCOPES
{% endhighlight %}

- For one workspace with Resource Restriction policy with Compute Ops Management with administrative privileges:

{% highlight shell %}
version_1#34652ff0317711ec9bc096872580fd6d:00000000-0000-0000-0000-000000000000:Observer:ALL_SCOPES:b394fa01-8858-4d73-8818-eadaf12eaf37:Administrator:ESX-Farm-Admins    
{% endhighlight %}


> To see more *hpe_ccs_attribute* examples, see [SAML-SSO Appendix](https://support.hpe.com/hpesc/public/docDisplay?docId=a00120892en_us&page=GUID-FBD3E576-C408-4EE1-B036-CDE9157D2B07.html#ariaid-title1)

> For more information on how to build *hpe_ccs_attribute*, see [HPE GreenLake SAML attributes](https://support.hpe.com/hpesc/public/docDisplay?docId=a00120892en_us&page=GUID-237A2D36-D5D3-4514-915F-42B2ACDF825C.html)


> **Important note**: 
> There seems to be a bug, because if you define a SAML HPE GreenLake attribute with a resource restriction policy name but without at least the HPE GreenLake observer role (i.e. 00000000-0000-0000-0000-00000000:Observer:ALL_SCOPES) you won't have access to your applications.
> The *hpe_ccs_attribute* value 'version_1#34652ff0317711ec9bc096872580fd6d:b394fa01-8858-4d73-8818-eadaf12eaf37:Administrator:ESX-Farm-Admins' will return the following error when accessing the application tab:
>
>![]( {{ site.baseurl }}/assets/images/AD-ADFS-44-3.png){:class="body-image-post"}





Once your have your own custom values for **hpe_ccs_attribute**, put the value in the **Outgoing claim value field** corresponding to the administrative privileges:

  ![]( {{ site.baseurl }}/assets/images/AD-ADFS-45.png){:class="body-image-post"}

Then click **Finish**:

  ![]( {{ site.baseurl }}/assets/images/AD-ADFS-46.png){:class="body-image-post"}

To create the second rule for the observers, click again on **Add Rule** and select again **Send Group Membership as Claim** as the template:

 On the next screen:

1. Enter a rule name such as *GLCP_Observer_group* 
2. Select the AD group **GLCP-Observers**: 
   
   ![]( {{ site.baseurl }}/assets/images/AD-ADFS-47.png){:class="citation-image-post"}

3. For the *Outgoing claim type*, enter **hpe_ccs_attribute**

   ![]( {{ site.baseurl }}/assets/images/AD-ADFS-48.png){:class="citation-image-post"}

4. Enter your values in the **Outgoing claim value field** for the **hpe_ccs_attribute** corresponding to the read only privileges:

   ![]( {{ site.baseurl }}/assets/images/AD-ADFS-49.png){:class="citation-image-post"}


Finally, click **Finish**.

You should now have two group membership claim rules in ADFS, one for the administrative role and one for the read-only one:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-50.png){:class="citation-image-post"}

You can now click **Ok** to complete the claim issuance policy definition for HPE GreenLake.

<a name="testing"></a>

# Testing steps

Installation is now complete, you can start testing your configuration.

<a name="testingADFSsignonpage"></a>

## Step 1: Testing the ADFS sign on page

To test your ADFS  sign on page, open a web browser, and go to [https://\<FQDN\>/adfs/ls/IdPInitiatedSignon.aspx](https://\<your_Fully_Qualified_Domain_Name\>/adfs/ls/IdPInitiatedSignon.aspx) with \<FQDN\> the fully qualified domain name (FQDN) host name of your ADFS server.

![]( {{ site.baseurl }}/assets/images/AD-ADFS-51.png){:class="body-image-post"}

If you get an error like the one in the screenshot above, launch a PowerShell administrative console from the ADFS server and run the following command:

{% highlight shell %}
Set-AdfsProperties -EnableIdPInitiatedSignonPage $True
{% endhighlight %}

Refresh the page in your browser and the problem should be corrected: 

![]( {{ site.baseurl }}/assets/images/AD-ADFS-52.png){:class="body-image-post"}

You can then close this page for now.

<a name="SPInitiatedtest"></a>

## Step 2: SP-Initiated test authentication


**Prerequisite**: Before continuing and testing the SSO connection, make sure you are disconnected from the HPE GreenLake platform.

This test consists of testing the authentication initiated by the Service provider, i.e. HPE GreenLake.

Open a web browser, and go to the HPE GreenLake interface at [https://common.cloud.hpe.com/](https://common.cloud.hpe.com/) and click the **Sign in with SSO** button:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-53.png){:class="body-image-post"}{:width="60%"}

### Test authentication with an AD administrator user

To test an AD user with administrative role, provide the Active Directory e-mail address of the admin user created at step 3 in our example (i.e. lionel) then click **Next**:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-54.png){:class="body-image-post"}{:width="60%"}

The ADFS sign on page opens, enter the Active Directory user credentials and click **Sign in**:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-55.png){:class="body-image-post"}

> **Note**: It is worth noting that having a different internal Active Directory domain name from the public one accessible from outside is completely valid and acceptable.

If everything is working correctly, the window should then switch to the HPE GreenLake user interface. You are now logged in to the platform ! 

If you have configured multiple workspaces in *hpe_ccs_attribute*, you should see all your workspaces listed in the first page:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-56.png){:class="body-image-post"}

Select a workspace and check that you have administrative rights in **Manage** / **Identity & Access** / **Users** by selecting your user account:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-57.png){:class="body-image-post"}

The administrative role should be listed for all application defined in *hpe_ccs_attribute*.

> **Note**: If a user is a member of several AD security groups, the group with the highest SAML HPE GreenLake *hpe_ccs_attribute* is always used when connecting to the platform.

### Test authentication with an AD observer user

To test the next AD user with the observer role, it is first necessary to disconnect from the HPE GreenLake platform:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-58.png){:class="body-image-post"}

And to also disconnect from HPE GreenLake in the ADFS sign on page at [https://\<FQDN\>/adfs/ls/IdPInitiatedSignon.aspx](https://\<FQDN\>/adfs/ls/IdPInitiatedSignon.aspx):

![]( {{ site.baseurl }}/assets/images/AD-ADFS-59.png){:class="body-image-post"}

Once you've logged out from both, you can click on the **Sign in with SSO** button again and provide the Active Directory e-mail address of the observer user created at step 3 in our example (i.e. mike) then click **Next**:


![]( {{ site.baseurl }}/assets/images/AD-ADFS-60.png){:class="body-image-post"}{:width="60%"}

The ADFS sign on page opens again, enter this time the Active Directory observer user credentials and click **Sign in**:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-61.png){:class="body-image-post"}

And check that you have observer rights in **Manage** / **Identity & Access** / **Users** by selecting your user account.

![]( {{ site.baseurl }}/assets/images/AD-ADFS-62.png){:class="body-image-post"}

> **Note**: With a resource restriction policy set in *hpe_ccs_attribute*, the HPE GreenLake user account resource access information is defined as **Limited Access**: 
>
> ![]( {{ site.baseurl }}/assets/images/AD-ADFS-63.png){:class="body-image-post"}
>
> You can click on **Limited Access** to obtain the name of the resource restriction policy used:
>
> ![]( {{ site.baseurl }}/assets/images/AD-ADFS-64.png){:class="body-image-post"}{:width="50%"}

<a name="iDPInitiatedtest"></a>

## Step 3: iDP-Initiated test authentication


This time, you want to test the authentication initiated by the identity provider, i.e. ADFS.

**Prerequisite**: Before running this test, make sure you are disconnected from the HPE GreenLake platform and from the ADFS sign on page.

Open a web browser, and go to the encoded URL you have build earlier in Step 7, the URL might look like:

```
https://\<FQDN\>/adfs/ls/IdPInitiatedSignon.aspx?RelayState=RPID%3Dhttps%253A%252F%252Fsso.common.cloud.hpe.com%26RelayState%3Dhttps%253A%252F%252Fcommon.cloud.hpe.com%252F
```   

You should be prompted to sign-in. Enter your credentials.

![]( {{ site.baseurl }}/assets/images/AD-ADFS-55.png){:class="body-image-post"}

If you are redirected to the HPE GreenLake platform, the process succeeds, you’re signed in.

![]( {{ site.baseurl }}/assets/images/AD-ADFS-56.png){:class="body-image-post"}


<a name="troubleshooting"></a>

### Troubleshooting SAML connectivity errors

If you've diligently followed all the steps in this blog, you shouldn't be far from successful SAML authentication, but if you still encounter problems, there are a number of tools that can be used to analyze SAML connections. One of the most popular tool is SAML Tracer. [SAML Tracer](https://chrome.google.com/webstore/detail/saml-tracer/mpdajninpobndbfcldcmbpnnbhibjmch) is a browser extension that allows you to view and debug SAML requests and responses. It is available for [Chrome]((https://chrome.google.com/webstore/detail/saml-tracer/mpdajninpobndbfcldcmbpnnbhibjmch) ), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/saml-tracer/), and Edge. 

Below are examples of typical SAML POST requests with the correct attributes for an administrative user (with two workspaces):

1. From ADFS to HPE SSO:
   
   ![]( {{ site.baseurl }}/assets/images/AD-ADFS-65.png){:class="body-image-post"}

2. From HPE SSO to HPE GreenLake AuthN:

   ![]( {{ site.baseurl }}/assets/images/AD-ADFS-66.png){:class="body-image-post"}


Below are examples of typical SAML POST requests with the correct attributes for an observer user (with two workspaces):

1. From ADFS to HPE SSO:
   
   ![]( {{ site.baseurl }}/assets/images/AD-ADFS-67.png){:class="body-image-post"}
 
2. From HPE SSO to HPE GreenLake AuthN:

   ![]( {{ site.baseurl }}/assets/images/AD-ADFS-68.png){:class="body-image-post"}


#### Lack of SAML attributes

If you don't find the same SAML attributes in your traces, like illustrated below:
 
![]( {{ site.baseurl }}/assets/images/AD-ADFS-69.png){:class="body-image-post"}

Make sure your ADFS claim rules are correct and that your AD user account includes a first name, last name and e-mail address:

![]( {{ site.baseurl }}/assets/images/AD-ADFS-70.png){:class="body-image-post"}


#### ADFS logs

Another place to troubleshoot a SAML connection is to check the logs of the ADFS server. 

The logs can provide valuable information about the errors that are occurring during the SAML handshake.

![]( {{ site.baseurl }}/assets/images/AD-ADFS-71.png){:class="body-image-post"}


> More ADFS troubleshooting information can be found [here](https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/troubleshooting/ad-fs-tshoot-overview).

This concludes this blog post. I hope you find it useful and should you have any feedback, please send me a [message](mailto:lio@hpe.com).
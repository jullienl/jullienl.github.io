---
layout: post
title: "Bare metal provisioning with Compute Ops Management and Ansible"
categories: Compute Ops Management
image: /assets/images/COM-Baremetal/Baremetal-Title.jpg
# excerpt: Streamline your server deployments with HPE GreenLake
tags: GreenLake COM Ansible 
---



In the rapidly-evolving world of IT infrastructure management, achieving speed, efficiency, and reliability in server provisioning can make a significant difference. This is where cutting-edge tools like [HPE GreenLake for Compute Ops Management](https://www.hpe.com/us/en/hpe-greenlake-compute-ops-management.html) and [Ansible](https://www.ansible.com/) come into play. Together, they create a robust platform for managing your infrastructure seamlessly. In this blog post, I will introduce an exciting new GitHub project that exemplifies how to harness these tools for optimal bare metal provisioning.

## Introducing a new GitHub project
I am excited to share a [new project](https://github.com/jullienl/HPE-COM-baremetal). It is an open-source initiative hosted on GitHub that aims to enhance the integration between HPE GreenLake for Compute Ops Management and Ansible. This endeavor is focused on making it easier to configure, manage and provision bare metal servers at scale.

The initial aim of this project was to focus on server provisioning for the ESXi, RHEL and Windows Server platforms. However, it also aims to provide an overview of the various capabilities of the Compute Ops Management API. The project effectively demonstrates a wide range of API interactions, covering everything from initial installation (Day0 operations) through the early stages of active use (Day1) to ongoing maintenance (Day2) with automated firmware updates.

Main operations include:   
  
* Collecting server information   
* Identifying storage destinations for the operating system install   
* Configuring server settings:  
   * BIOS settings   
   * Storage configurations   
   * OS provisioning   
* Creating tailor-made kickstart scripts and assembling ISOs   
* Starting and monitoring OS image installation   
* Installing and monitoring HPE Agentless Management Service (AMS) and Smart Update Tool (SUT)  
* Creating server groups with specific settings   
* Adding servers to temporary and permanent server groups   
* Executing firmware updates   
* Monitoring task execution
* Managing errors related to tasks  

In this project, automating the provisioning of operating systems on bare metal servers is made simple and accessible to anyone with basic knowledge of Ansible, HPE Compute Ops Management, and kickstart techniques. While it is generally a complex process that requires a wide range of skills, this project simplifies it with the use of auto-customized kickstarts, auto-generated ISO files and by exploiting the very compelling features of HPE Compute Ops Management server groups.


## Key highlights of this project 

- **Automated provisioning**: Kickstart your server setups without tedious manual configuration.
- **Centralized control**: Manage your entire fleet of servers from a single pane of glass.
- **Scalable architecture**: Effortlessly scale your infrastructure to meet growing business demands.
- **Pre-built playbooks**: Jumpstart your automation with curated collection, crafted for various deployment scenarios (Microsoft Windows Server, VMware ESXi and Red Hat Enterprise Linux).
- **Custom Ansible variables**: Enable you to define environment-specific parameters, ensuring that each server gets a configuration that fits its role in the infrastructure, ensuring that you have granular control over server provisioning.
- **Comprehensive documentation**: Detailed guides, videos and examples help you customize the workflow to your specific requirements.


## Mastering server management with COM

HPE GreenLake for Compute Ops Management is a comprehensive solution for hardware resource management, providing a seamless way to handle server deployments. With its ability to manage health monitoring, orchestrate server configuration and firmware update workflows, and automate bare metal provisioning, administrators can ensure their data centers operate optimally with less effort and greater oversight. To learn more, see [HPE GreenLake for Compute Ops Management](https://www.hpe.com/emea_europe/en/hpe-greenlake-compute-ops-management.html)

## Bridging HPE GreenLake for COM and Ansible

HPE GreenLake for Compute Ops Management provides the foundational management capabilities essential for maintaining data center health and efficiency. When combined with the automation capabilities of Ansible, IT administrators can achieve unprecedented levels of automation.

## Bringing it all together
- **Automated Workflows**: Convert time-consuming manual processes into automated workflows that can be tracked and managed easily.
- **Scalable Infrastructure**: Embrace growth without compromising on performance or manageability.
- **Reduced Human Error**: Minimize mistakes by standardizing server configurations across the board.

## Mastering parallel execution with Ansible

A key attribute of Ansible that I looked for in this project is its impressive capability to execute tasks concurrently across multiple systems, thereby accelerating deployment processes. This feature is called "forks" in Ansible. Set to 5 by default, the forks value is adjustable based on available system resources (CPU and memory), signifying that Ansible can carry out playbook tasks in parallel across 5 hosts from the inventory list. This parallel execution is among Ansible's outstanding functionalities, enhancing the effectiveness of bare-metal provisioning substantially. Moreover, this approach ensures consistent configurations across all provisioned hosts.

## Where to start?

To gain an understanding of the project, please refer to the [readme.md](https://github.com/jullienl/HPE-COM-baremetal/blob/main/readme.md) file within the project's repository. It will provide you with detailed instructions on:

- [The necessary prerequisites for utilizing this project](https://github.com/jullienl/HPE-COM-baremetal#prerequisites)
- [The process for setting up the Ansible control node](https://github.com/jullienl/HPE-COM-baremetal#ansible-control-node-information)
- [The initial steps required prior to executing a playbook](https://github.com/jullienl/HPE-COM-baremetal#preparation-to-run-the-playbooks)

This repository also hosts an extensively detailed lab guide that provides comprehensive instructions on the entire setup process for this project. The guide encompasses several critical aspects:

- Step-by-Step Installation Instructions: A meticulous walkthrough to install all necessary components from the ground up.
- Configuration Details: Clear guidelines on how to accurately configure each variable within the project environment.
- Execution Protocol: Straightforward steps detailing how to execute a playbook effectively, allowing you to provision operating systems with ease.


See [HPE GreenLake for Compute Ops Management baremetal provisioning with Ansible](https://github.com/jullienl/HPE-COM-baremetal/blob/main/HPE%20GreenLake%20for%20Compute%20Ops%20Management%20baremetal%20provisioning%20with%20Ansible.pdf) 

## How to run a playbook?

A single command is required to provision all hosts listed in an inventory file: 


```shell
ansible-playbook <provisioning_file>.yml -i <inventory_file> --ask-vault-pass --ask-become-pass
```

Where `<provisioning_file>` should be replaced with `ESXi_provisioning`, `RHEL_provisioning`, or `WIN_provisioning` depending on the target operating system. Similarly, replace `<inventory_file>` with the appropriate inventory filename such as `hosts_ESXi`, `hosts_RHEL`, or `hosts_WIN`.

Upon running this command, Ansible will prompt you to enter the vault password and the sudo password to proceed with the provisioning process.



## Explore my video series

Dive into this series of videos showcasing the seamless bare metal operation across three major operating systems. Each video provides a walk through over the different variables involved and the files that are required to update HPE drivers and software, along with the explanation of the different steps of each playbook.

### Windows Server provisioning

Windows Server Bare Metal Provisioning on 2 x HPE ProLiant DL360 Gen10 Plus

  <iframe width="560" height="315" src="https://www.youtube.com/embed/A6RD6nIAFmw?si=_kEqBAsVx20nvONy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### RHEL 9.3 provisioning

RHEL 9.3 Bare Metal Provisioning on 2 x HPE ProLiant DL360 Gen10 Plus

  <iframe width="560" height="315" src="https://www.youtube.com/embed/6_o8yB4cvag?si=OGQob5dNNF28rTF-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### VMware ESXi provisioning 

VMware ESXi  Bare Metal Provisioning on 2 x HPE ProLiant DL360 Gen10 Plus

  <iframe width="560" height="315" src="https://www.youtube.com/embed/_ySgROdd_Bw?si=CSzCklbTeRzaRtFg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Join me on my [GitHub repository](https://github.com/jullienl/HPE-COM-baremetal), where a wealth of information awaits you in the README file. Learn how to effectively utilize this project, from cloning it into your environment to commencing with its use, and witness the ways it can streamline your bare metal provisioning workflow.

Stay tuned as I continue to update and maintain this project, incorporating user [feedback](mailto:lio@hpe.com) and the latest advancements that HPE GreenLake will offer.

Get started now and begin transforming your server deployment strategy today!
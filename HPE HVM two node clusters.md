# HPE HVM two node clusters

## Objective
Create a 2-node, highly available cluster with HPE HVM

## Architecture
A 2-node cluster is composed of the following components:
- 2 servers with HPE HVM installed
- An external quorum witness using the HPE Morpheus Worker
- External storage for virtual machine data

## Requirements
**HPE Morpheus Distributed Worker:** The HPE Morpheus Distributed Workeris a lightweight linux package that can be installed in any linux distribution that supports RPM or DEB packages. It can be a physical or a virtual machine. Today, it's only supported on x86 architectures
**Time synchronization:** Having time synchronization is ***CRITICAL*** for *ANY* cluster, please make sure your servers are time synchronized. 
*Note:* The latest HVM ISO (included with HPE Morpheus VM Essentials 9.0) installs with chrony configured for time syncronization, earlier versions use systemd-timesyncd

## Installation

### Assumptions
This guide assumes the following:
- The HPE HVM hosts are already installed and their network is configured
- The HPE Morpheus Manager is already deployed
- The HPE Morpheus Worker package is available in the machine designated for its installation

### Installation steps
To deploy an HPE HVM 2-node cluster, the following steps need to be taken.
1. **Deploy HPE Morpheus Worker:** Deploy your external witness on your designated machine
2. **Add HPE Morpheus Worker to HPE Morpheus Manager:** Add the Worker to your Manager to get the required API keys
3. **Configure HPE Morpheus Worker:** Configure the Worker to connect to the Morpheus Manager
4. **Create HPE HVM Cluster:** Create the HVM cluster selecting the Worker during cluster deployment

### Deploy HPE Morpheus Worker
Once you have your installer package ready, install it using your distribution's package manager.
*For Ubuntu/Debian based distros:* `sudo dpkg -i HPE_Morpheus_Enterprise_Appliance_9.0.0-1_Worker_debian_x86_64_S6E64-11202.deb`
*For RedHat based distros:* `sudo dnf install HPE_Morpheus_Enterprise_Appliance_9.0.0-1_Worker_x86_64_S6E64-11203.rpm`

Once the Worker package has been installed, it still needs to be configured by editing the configuration file `/etc/morpheus/morpheus-worker.rb` and then running `sudo morpheus-worker-ctl reconfigure`. The required information to populate the configuration file is acquired in the next step.

### Add HPE Morpheus Worker to HPE Morpheus Manager
Adding a Worker to the HPE Morpheus Manager is a required step to get the information needed in the Worker's configuration file. To add a new Worker to the Morpheus Manager, follow these steps in the UI:
- Go to Administration > Integrations
- Select the Distributed Workers tab
- Click on *+ Add Worker*
- Fill in the required information:
  - *Name:* Enter the name your Worker will have in the Morpheus UI
  - *Worker URL:* Enter your worker's URL using wither its FQDN or its IP as `https://<worker-ip-or-fqdn>`
- Back on the Distributed Workers tab, you'll see an *API KEY*. **SAVE THIS API KEY** 

### Configure HPE Morpheus Worker
Once you have your API key available, return to your HPE Morpheus Worker and edit the `/etc/morpheus/morpheus-worker.rb` configuration file with the required info in the following fields:
```bash
worker_url 'https://<worker-ip-or-fqdn>'
worker['appliance_url'] = 'https://<morpheus-manager-ip-or-fqdn>'
worker['worker_key'] = '<your api key from last step>'
```
**NOTE:** By default, the `worker['worker_key] = 'DISTRIBUTED WORKER KEY (OPTIONAL)'` is commented out, uncomment it by removing the \# in front of it **AND** comment `worker['apikey'] = 'API KEY FOR THIS GATEWAY'` line

Now that the configuration file has been updated, run:
`sudo morpheus-worker-ctl reconfigure`

Once this command finishes, you can proceed to create your cluster

### Create HPE HVM Cluster
Creating a 2-node cluster is similar to any other HVM cluster, the only difference is that you need to select your *WITNESS WORKER* at the bottom of the *Configuration Options* modal during the *CREATE CLUSTER* workflow




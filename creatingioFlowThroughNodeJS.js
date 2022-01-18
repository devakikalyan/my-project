const axios = require('axios');
const config = {
    headers: { Authorization: `Bearer *************************` }
};

const connectionData = {
    type: "netsuite",
    name: "Test Netsuitssss connection",
    netsuite: {
        account: "TSTDRV1372774",
        roleId: "3",
        email: "devakikalyanchandra.yadavpodila@celigo.com",
        password: "********",
        environment: "production",
    }
}


async function myConnection() {
    let imports = await axios.post('https://api.staging.integrator.io/v1/connections', connectionData,config);
   return imports.data._id;
  }

  async function generateTheFlow(exportId,importId) {

    const flowData = {
        name: "NODEJS ASSIGNMENT Send netsuite employee to netsuite",
        disabled: false,
        _exportId: `${exportId}`,
        _importId: `${importId}`,
        skipRetries: false
    }
    let flows = await axios.post('https://api.staging.integrator.io/v1/flows', flowData,config);
  }

async function getExports(id){

const data = {
    
    name: "Test Netsuite Employeesssss Export",
    _connectionId: `${id}`,
    asynchronous: true,
    oneToMany: false,
    sandbox: false,
    netsuite: {
        type: "restlet",
        skipGrouping: true,
        statsOnly: false,
        restlet: {
            recordType: "employee",
            searchId: "1428",
            useSS2Restlets: false
        },
        distributed: {
            disabled: false,
            forceReload: false
        }
    }
};


const exports = await axios.post('https://api.staging.integrator.io/v1/exports', data,config);

    return exports.data._id;
}


async function getImports(id){
    
    const importData = {
        
            name: "Test Netsuite Employeesssss import",
            _connectionId: `${id}`,
            distributed: true,
        ignoreExisting: false,
        ignoreMissing: false,
        oneToMany: false,
        sandbox: false,
        lookups: [],
            netsuite_da: {
                useSS2Restlets: false,
                operation: "addupdate",
                recordType: "employee",
                internalIdLookup: {
                    "expression": "[\"internalid\",\"is\",\"{{{[Internal ID]}}}\"]"
                },
                mapping: {
                    fields: [
                        {
                            generate: "email",
                            extract: "Email",
                            internalId: false
                        },
                        {
                            generate: "phone",
                            extract: "Phone",
                            internalId: false
                        },
                        {
                            generate: "firstname",
                            extract: "['First Name']",
                            internalId: false
                        },
                        {
                            generate: "lastname",
                            extract: "['Last Name']",
                            internalId: false
                        },
                        {
                            generate: "mobilephone",
                            extract: "Phone",
                            internalId: false
                        },
                        {
                            generate: "hiredate",
                            extract: "['Hire Date']",
                            internalId: false
                        },
                        {
                            generate: "middlename",
                            extract: "['Middle Name']",
                            internalId: false
                        },
                        {
                            generate: "officephone",
                            extract: "['Office Phone']",
                            internalId: false
                        },
                        {
                            generate: "homephone",
                            extract: "Phone",
                            internalId: false
                        },
                        {
                            generate: "title",
                            extract: "['Job Title']",
                            internalId: false
                        },
                        {
                            generate: "birthdate",
                            extract: "['Birth Date']",
                            internalId: false
                        },
                        {
                            generate: "releasedate",
                            extract: "['Termination Date']",
                            internalId: false
                        }
                    ],
                    lists: [
                        {
                            generate: "_billing_addressbook",
                            fields: [
                                {
                                    extract: "['Address 1']",
                                    generate: "addr1",
                                    internalId: false
                                }
                            ]
                        }
                    ]
                }
            },
            adaptorType: "NetSuiteDistributedImport"
        };
    
    
    const imports = await axios.post('https://api.staging.integrator.io/v1/imports', importData,config);

        return imports.data._id;
    }

    
  async function executeAsyncTask () {
    const connectionId = await myConnection();
    console.log(connectionId);
    const exportId = await getExports(connectionId);
    console.log(exportId);
    const importId = await getImports(connectionId);
    console.log(importId);
    const flow= await generateTheFlow(exportId,importId)

  }
  executeAsyncTask();


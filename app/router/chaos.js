const express = require('express')

const getauthorize = require('../authorizer/authorize')


const deleteInstanceGroup = require('../api/deleteInstanceGroup')
const deleteInstanceGroupRegional = require('../api/deleteInstanceGroupRegional')
const deleteVMInstance = require('../api/deleteVMInstance')
const stopVMInstance = require('../api/stopVMInstance')


const {google} = require('googleapis');
var compute = google.compute('v1');

const router = new express.Router()

router.get('/',(req,res) =>{

    res.status(201).send('Hello')
})


router.post('/stopVMInstance',(req,res) =>{
    const requestbody = req.body
    const project = requestbody.project
    const zone = requestbody.zone
    const instance =requestbody.instance
    const authorize = getauthorize
    authorize(function(authClient) {
        var request = {
          // Project ID for this request.
          project: project,  // TODO: Update placeholder value.
      
          // The name of the zone for this request.
          zone: zone,  // TODO: Update placeholder value.
      
          // Name of the instance resource to stop.
          instance: instance,  // TODO: Update placeholder value.
      
          auth: authClient,
        };
      
         compute.instances.stop(request, function (err, response) {
        if (err) {
          console.error(err);
            return;
        }
        // TODO: Change code below to process the `response` object:
        console.log(JSON.stringify(response, null, 2));
      });
      });
    res.status(201).send('Sucess')
})

router.post('/deleteVMInstance',(req,res)=>{

    const authorize = getauthorize
    authorize(function(authClient) {
        var request = {
          // Project ID for this request.
          project: 'deductive-tempo-248019',  // TODO: Update placeholder value.
      
          // The name of the zone for this request.
          zone: 'us-central1-a',  // TODO: Update placeholder value.
      
          // Name of the instance resource to delete.
          instance: 'test',  // TODO: Update placeholder value.
      
          auth: authClient,
        };
      
        compute.instances.delete(request, function(err, response) {
          if (err) {
            console.error(err);
            return;
          }
      
          // TODO: Change code below to process the `response` object:
          console.log(JSON.stringify(response, null, 2));
        });
      });
      res.status(201).send('deleteVMInstance')

})

router.post('/deleteInstanceGroup',(req,res) => {
    const authorize = getauthorize
    authorize(function(authClient) {
        var request = {
          // Project ID for this request.
          project: 'deductive-tempo-248019',  // TODO: Update placeholder value.
      
          // The name of the zone where the instance group is located.
          zone: 'us-central1',  // TODO: Update placeholder value.
      
          // The name of the instance group to delete.
          instanceGroup: 'test',  // TODO: Update placeholder value.
      
          auth: authClient,
        };
      
        compute.instanceGroups.delete(request, function(err, response) {
          if (err) {
            console.error(err);
            return;
          }
      
          // TODO: Change code below to process the `response` object:
          console.log(JSON.stringify(response, null, 2));
        });
      });
      res.status(201).send('deleteInstanceGroup')
})

router.post('/deleteInstanceGroupRegional',(req,res)=>{

    const authorize = getauthorize
    authorize(function(authClient) {
        var request = {
          // Project ID for this request.
          project: 'deductive-tempo-248019',  // TODO: Update placeholder value.
      
          // Name of the region scoping this request.
          region: 'my-region',  // TODO: Update placeholder value.
      
          // Name of the managed instance group to delete.
          instanceGroupManager: 'my-instance-group-manager',  // TODO: Update placeholder value.
      
          auth: authClient,
        };
      
        compute.regionInstanceGroupManagers.delete(request, function(err, response) {
          if (err) {
            console.error(err);
            return;
          }
      
          // TODO: Change code below to process the `response` object:
          console.log(JSON.stringify(response, null, 2));
        });
      });
      res.status(201).send('deleteInstanceGroupRegional')
})

module.exports = router
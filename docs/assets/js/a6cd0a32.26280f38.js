"use strict";(self.webpackChunkrestasaurus_docs=self.webpackChunkrestasaurus_docs||[]).push([[576],{1837:e=>{e.exports=JSON.parse('{"url":"redocusaurus\\\\plugin-redoc-0.yaml","themeId":"theme-redoc","isSpecFile":true,"spec":{"openapi":"3.1.0","info":{"title":"OpenAPI Specification","description":"A RESTful API about dinosaurs built using Express, MongoDB and Mongoose.","license":{"name":"MIT","url":"https://choosealicense.com/licenses/mit/"},"version":"1.0.0"},"externalDocs":{"description":"Read more about the API","url":"http://vikiru.github.io/restasaurus/"},"servers":[{"url":"localhost:3000/api/v1"}],"tags":[{"name":"general","description":"Retrieve general information about the API or dinosaurs such as all clades, diets, locomotions, and names within the API."},{"name":"dinosaur","description":"Retrieve dinosaur information."},{"name":"image","description":"Retrieve dinosaur image information."}],"paths":{"/":{"get":{"tags":["general"],"summary":"Retrieve the main API endpoint","description":"This endpoint returns the API version, available endpoints, rate limit, and a disclaimer.","responses":{"200":{"description":"successful operation","content":{"application/json":{"schema":{"type":"object","properties":{"apiVersion":{"type":"string"},"apiEndpoints":{"type":"array","items":{"type":"string"}},"rateLimit":{"type":"string"},"disclaimer":{"type":"string"}}}}}}}}},"/clades":{"get":{"tags":["general"],"summary":"Retrieve all dinosaur clades","description":"This endpoint retrieves all dinosaur clades.","responses":{"200":{"description":"A list of dinosaur clades","content":{"application/json":{"schema":{"type":"object","properties":{"uniqueClades":{"type":"integer","description":"The number of unique clades"},"data":{"type":"array","items":{"type":"string","description":"The list of clades"}}}}}}},"404":{"description":"Error message when no clades are found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"}}}}}},"500":{"description":"Error message when an unexpected error occurred","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"}}}}}}}}},"/diets":{"get":{"tags":["general"],"summary":"Retrieve all dinosaur diets","description":"This endpoint retrieves all dinosaur diets.","responses":{"200":{"description":"A list of dinosaur diets","content":{"application/json":{"schema":{"type":"object","properties":{"uniqueDiets":{"type":"integer","description":"The number of unique diets"},"data":{"type":"array","items":{"type":"string","description":"The list of diets"}}}}}}},"404":{"description":"Error message when no diets are found"},"500":{"description":"Error message when an unexpected error occurred"}}}},"/locomotions":{"get":{"tags":["general"],"summary":"Retrieve all dinosaur locomotions","description":"This endpoint retrieves all dinosaur locomotions.","responses":{"200":{"description":"A list of dinosaur locomotions","content":{"application/json":{"schema":{"type":"object","properties":{"uniqueLocomotions":{"type":"integer","description":"The number of unique locomotions"},"data":{"type":"array","items":{"type":"string","description":"The list of locomotions"}}}}}}},"404":{"description":"Error message when no locomotions are found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"}}}}}},"500":{"description":"Error message when an unexpected error occurred","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"}}}}}}}}},"/names":{"get":{"tags":["general"],"summary":"Retrieve all dinosaur names","description":"This endpoint retrieves all dinosaur names.","responses":{"200":{"description":"successful operation","content":{"application/json":{"schema":{"type":"object","properties":{"count":{"type":"integer"},"data":{"type":"array","items":{"type":"string"}}}}}}},"404":{"description":"Dinosaur names not found"},"500":{"description":"Unexpected error"}}}},"/dinosaurs/{page}":{"get":{"tags":["dinosaur"],"summary":"Retrieve all dinosaurs","description":"This endpoint retrieves all dinosaurs.","parameters":[{"name":"page","in":"path","description":"Page number for pagination","required":true,"schema":{"type":"integer","format":"int32"}}],"responses":{"200":{"description":"successful operation","content":{"application/json":{"schema":{"type":"array","items":{"$ref":"#/components/schemas/Dinosaur"}}}}},"404":{"description":"Dinosaurs not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Sorry, there was an error retrieving all dinosaurs."}}}}}},"500":{"description":"Unexpected error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Sorry, an unexpected error occurred while retrieving all dinosaurs."}}}}}}}}},"/dinosaurs/{id}":{"get":{"tags":["dinosaur"],"summary":"Retrieve a dinosaur by ID","description":"This endpoint retrieves a dinosaur by its ID.","parameters":[{"name":"id","in":"path","description":"ID of the dinosaur to retrieve","required":true,"schema":{"type":"integer","format":"int32"}}],"responses":{"200":{"description":"successful operation","content":{"application/json":{"schema":{"$ref":"#/components/schemas/Dinosaur"}}}},"404":{"description":"Dinosaur not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Sorry, there doesnt seem to be a dinosaur matching that id."}}}}}},"500":{"description":"Unexpected error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Sorry, an unexpected error occurred while retrieving a dinosaur matching the specified id."}}}}}}}}},"/dinosaurs/name/{name}":{"get":{"tags":["dinosaur"],"summary":"Retrieve a dinosaur by name","description":"This endpoint retrieves a dinosaur by its name.","parameters":[{"name":"name","in":"path","description":"Name of the dinosaur to retrieve","required":true,"schema":{"type":"string"}}],"responses":{"200":{"description":"successful operation","content":{"application/json":{"schema":{"$ref":"#/components/schemas/Dinosaur"}}}},"404":{"description":"Dinosaur not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Sorry, there doesnt seem to be a dinosaur matching that name."}}}}}},"500":{"description":"Unexpected error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Sorry, an unexpected error occurred trying to find a dinosaur matching that name."}}}}}}}}},"/dinosaurs/diet/{diet}":{"get":{"tags":["dinosaur"],"summary":"Retrieve dinosaurs by diet","description":"This endpoint retrieves dinosaurs by their diet.","parameters":[{"name":"diet","in":"path","description":"Diet of the dinosaurs to retrieve","required":true,"schema":{"type":"string"}}],"responses":{"200":{"description":"successful operation","content":{"application/json":{"schema":{"type":"object","properties":{"count":{"type":"integer"},"data":{"type":"array","items":{"$ref":"#/components/schemas/Dinosaur"}}}}}}},"404":{"description":"Dinosaurs not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Sorry, there doesn\'t seem to be any dinosaurs matching that diet."}}}}}},"500":{"description":"Unexpected error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Sorry, an unexpected error occurred while retrieving all dinosaurs matching that diet."}}}}}}}}},"/dinosaurs/locomotion/{locomotion}":{"get":{"tags":["dinosaur"],"summary":"Retrieve dinosaurs by locomotion type","description":"This endpoint retrieves dinosaurs by their locomotion type.","parameters":[{"name":"locomotion","in":"path","description":"Locomotion type of the dinosaurs to retrieve","required":true,"schema":{"type":"string"}}],"responses":{"200":{"description":"successful operation","content":{"application/json":{"schema":{"type":"object","properties":{"count":{"type":"integer"},"data":{"type":"array","items":{"$ref":"#/components/schemas/Dinosaur"}}}}}}},"404":{"description":"Dinosaurs not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Sorry, there doesn\'t seem to be any dinosaurs matching that locomotion type."}}}}}},"500":{"description":"Unexpected error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Sorry, an unexpected error occurred while retrieving all dinosaurs matching that diet."}}}}}}}}},"/dinosaurs/random/{count}":{"get":{"tags":["dinosaur"],"summary":"Retrieve a random number of dinosaurs","description":"This endpoint retrieves a random number of dinosaurs.","parameters":[{"name":"count","in":"path","description":"Number of dinosaurs to retrieve","required":true,"schema":{"type":"integer","format":"int32"}}],"responses":{"200":{"description":"successful operation","content":{"application/json":{"schema":{"type":"object","properties":{"count":{"type":"integer"},"data":{"type":"array","items":{"$ref":"#/components/schemas/Dinosaur"}}}}}}},"500":{"description":"Unexpected error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Sorry, an unexpected error occurred while trying to retrieve a random number of dinosaurs."}}}}}}}}},"/dinosaurs/search":{"get":{"tags":["dinosaur"],"summary":"Retrieve dinosaurs by query","description":"This endpoint retrieves dinosaurs by a query.","parameters":[{"name":"clade","in":"query","description":"Clade of the dinosaurs to retrieve","schema":{"type":"array","items":{"type":"string"}}},{"name":"diet","in":"query","description":"Diet of the dinosaurs to retrieve","schema":{"type":"string"}},{"name":"locomotion","in":"query","description":"Locomotion type of the dinosaurs to retrieve","schema":{"type":"string"}}],"responses":{"200":{"description":"successful operation","content":{"application/json":{"schema":{"type":"object","properties":{"count":{"type":"integer"},"data":{"type":"array","items":{"$ref":"#/components/schemas/Dinosaur"}}}}}}},"404":{"description":"Dinosaurs not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Sorry, there doesnt seem to be any dinosaurs matching that query."}}}}}},"500":{"description":"Unexpected error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Sorry, an unexpected error occurred while performing that query."}}}}}}}}},"/images/{page}":{"get":{"tags":["image"],"summary":"Retrieve all dinosaur images","description":"This endpoint retrieves all dinosaur images.","parameters":[{"name":"page","in":"path","description":"Page number for pagination","required":true,"schema":{"type":"integer","format":"int32"}}],"responses":{"200":{"description":"successful operation","content":{"application/json":{"schema":{"type":"array","items":{"$ref":"#/components/schemas/DinosaurImage"}}}}},"404":{"description":"Dinosaur images not found"},"500":{"description":"Unexpected error"}}}},"/images/{id}":{"get":{"tags":["image"],"summary":"Retrieve a dinosaur image by ID","description":"This endpoint retrieves a dinosaur image by its ID.","parameters":[{"name":"id","in":"path","description":"ID of the dinosaur image to retrieve","required":true,"schema":{"type":"integer","format":"int32"}}],"responses":{"200":{"description":"successful operation","content":{"application/json":{"schema":{"$ref":"#/components/schemas/DinosaurImage"}}}},"404":{"description":"Dinosaur image not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Sorry, there doesnt seem to be a dinosaur image matching that id."}}}}}},"500":{"description":"Unexpected error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Sorry, an unexpected occurred while trying to recieve an image matching that id."}}}}}}}}},"/images/random/{count}":{"get":{"tags":["image"],"summary":"Retrieve a random number of dinosaur images","description":"This endpoint retrieves a random number of dinosaur images.","parameters":[{"name":"count","in":"path","description":"Number of dinosaur images to retrieve","required":true,"schema":{"type":"integer","format":"int32"}}],"responses":{"200":{"description":"successful operation","content":{"application/json":{"schema":{"type":"object","properties":{"count":{"type":"integer"},"data":{"type":"array","items":{"$ref":"#/components/schemas/DinosaurImage"}}}}}}},"500":{"description":"Unexpected error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Sorry, an unexpected error occurred while trying to retrieve a random number of dinosaur images."}}}}}}}}}},"components":{"schemas":{"Dinosaur":{"type":"object","properties":{"id":{"type":"integer","format":"int32"},"name":{"type":"string"},"temporalRange":{"type":"string"},"diet":{"type":"string"},"locomotionType":{"type":"string"},"description":{"type":"string"},"classificationInfo":{"type":"string","format":"ObjectId","description":"Reference to ClassificationInfo"},"image":{"type":"string","format":"ObjectId","description":"Reference to DinosaurImage"},"source":{"type":"string","format":"ObjectId","description":"Reference to DinosaurSource"}},"required":["id","name","classificationInfo","image","source"]},"ClassificationInfo":{"type":"object","properties":{"domain":{"type":"string"},"kingdom":{"type":"string"},"phylum":{"type":"string"},"clade":{"type":"array","items":{"type":"string"}},"classInfo":{"type":"array","items":{"type":"object","properties":{"classType":{"type":"string"},"value":{"type":"string"}}}},"orderInfo":{"type":"array","items":{"type":"object","properties":{"orderType":{"type":"string"},"value":{"type":"string"}}}},"familyInfo":{"type":"array","items":{"type":"object","properties":{"familyType":{"type":"string"},"value":{"type":"string"}}}},"tribeInfo":{"type":"array","items":{"type":"object","properties":{"tribeType":{"type":"string"},"value":{"type":"string"}}}},"genusInfo":{"type":"array","items":{"type":"object","properties":{"genusType":{"type":"string"},"value":{"type":"string"}}}},"speciesInfo":{"type":"array","items":{"type":"object","properties":{"speciesType":{"type":"string"},"value":{"type":"string"}}}}}},"DinosaurImage":{"type":"object","properties":{"title":{"type":"string"},"description":{"type":"string"},"author":{"type":"string"},"authorURL":{"type":"string"},"imageURL":{"type":"string"},"license":{"type":"string"},"licenseURL":{"type":"string"},"dateCreated":{"type":"string"},"dateAccessed":{"type":"string"}}},"DinosaurSource":{"type":"object","properties":{"pageTitle":{"type":"string"},"author":{"type":"string"},"wikipediaURL":{"type":"string"},"license":{"type":"string"},"licenseURL":{"type":"string"},"permalink":{"type":"string"},"revisionHistoryURL":{"type":"string"},"lastRevision":{"type":"string"},"dateAccessed":{"type":"string"},"source":{"type":"string"},"publisher":{"type":"string"},"citation":{"type":"string"}}}}}}}')}}]);
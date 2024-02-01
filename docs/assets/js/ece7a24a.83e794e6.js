"use strict";(self.webpackChunkrestasaurus_docs=self.webpackChunkrestasaurus_docs||[]).push([[555],{5715:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>c,frontMatter:()=>o,metadata:()=>t,toc:()=>d});var r=i(5893),s=i(1151);const o={title:"\ud83e\udde9 Model Overview",slug:"/models"},a=void 0,t={id:"model",title:"\ud83e\udde9 Model Overview",description:"\ud83d\udcd6 Table of Contents",source:"@site/docs/model.md",sourceDirName:".",slug:"/models",permalink:"/restasaurus/models",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"\ud83e\udde9 Model Overview",slug:"/models"},sidebar:"docs",previous:{title:"\u26a1 Setup",permalink:"/restasaurus/setup"},next:{title:"Endpoint Overview",permalink:"/restasaurus/overview"}},l={},d=[{value:"\ud83d\udcd6 Table of Contents",id:"-table-of-contents",level:2},{value:"\ud83e\udd96 Dinosaur Model",id:"-dinosaur-model",level:2},{value:"\ud83d\udd0d ClassificationInfo Model",id:"-classificationinfo-model",level:2},{value:"\ud83d\udcf8 DinosaurImage Model",id:"-dinosaurimage-model",level:2},{value:"\ud83d\udcda DinosaurSource Model",id:"-dinosaursource-model",level:2}];function u(e){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{id:"-table-of-contents",children:"\ud83d\udcd6 Table of Contents"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#-table-of-contents",children:"\ud83d\udcd6 Table of Contents"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#-dinosaur-model",children:"\ud83e\udd96 Dinosaur Model"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#-classificationinfo-model",children:"\ud83d\udd0d ClassificationInfo Model"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#-dinosaurimage-model",children:"\ud83d\udcf8 DinosaurImage Model"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"#-dinosaursource-model",children:"\ud83d\udcda DinosaurSource Model"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"-dinosaur-model",children:"\ud83e\udd96 Dinosaur Model"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"https://github.com/vikiru/restasaurus/blob/main/app/models/Dinosaur.js",children:(0,r.jsx)(n.strong,{children:"Dinosaur"})}),": This is the main model which represents a dinosaur, including its unique properties such as name, temporal range, diet, locomotion type, and a description. Additionally, it also contains references to the sub-models below, which are populated with their relevant values when handling API requests."]}),"\n",(0,r.jsxs)(n.p,{children:["An example of a Dinosaur model stored within the MongoDB database is shown below, with all of its relevant properties. It should\r\nbe noted that although ",(0,r.jsx)(n.code,{children:"classificationInfo"}),", ",(0,r.jsx)(n.code,{children:"image"}),", ",(0,r.jsx)(n.code,{children:"source"})," show their value as being an ",(0,r.jsx)(n.code,{children:"ObjectId"}),", when the API processes\r\nrequests, these fields are populated with the relevant sub-documents which can be seen further down below."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\r\n    "id": 1118,\r\n    "name": "Zephyrosaurus",\r\n    "temporalRange": "Early Cretaceous, ~113 Ma",\r\n    "diet": "herbivore",\r\n    "locomotionType": "biped",\r\n    "description": "Zephyrosaurus (meaning \\"westward wind lizard\\") is a genus of orodromine ornithischian dinosaur. It is based on a partial skull and postcranial fragments discovered in the Aptian-Albian-age Lower Cretaceous Cloverly Formation of Carbon County, Montana, USA.  New remains are under description, and tracks from Maryland and Virginia, also in the US, have been attributed to animals similar to Zephyrosaurus. It lived approximately 113 mya.",\r\n    "classificationInfo": ObjectId("some-id-here"),\r\n    "image": ObjectId("some-id-here"),\r\n    "source": ObjectId("some-id-here"),\r\n}\n'})}),"\n",(0,r.jsx)(n.h2,{id:"-classificationinfo-model",children:"\ud83d\udd0d ClassificationInfo Model"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"https://github.com/vikiru/restasaurus/blob/main/app/models/ClassificationInfo.js/",children:"ClassificationInfo"}),": This model contains the classification information of a dinosaur, including details like its family, order, and genus."]}),"\n",(0,r.jsx)(n.p,{children:"An example of a ClassificationInfo model is shown below."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'"classificationInfo": {\r\n    "domain": "Eukaryota",\r\n    "kingdom": "Animalia",\r\n    "phylum": "Chordata",\r\n    "clade": [\r\n        "Dinosauria",\r\n        "Ornithischia"\r\n    ],\r\n    "classInfo": [],\r\n    "orderInfo": [],\r\n    "familyInfo": [\r\n    {\r\n        "familyType": "Family",\r\n        "value": "Thescelosauridae"\r\n    },\r\n    {\r\n        "familyType": "Subfamily",\r\n        "value": "Orodrominae"\r\n    }\r\n    ],\r\n    "tribeInfo": [],\r\n    "genusInfo": [\r\n    {\r\n        "genusType": "Genus",\r\n        "value": "Zephyrosaurus"\r\n    }\r\n    ],\r\n    "speciesInfo": []\r\n}\n'})}),"\n",(0,r.jsx)(n.h2,{id:"-dinosaurimage-model",children:"\ud83d\udcf8 DinosaurImage Model"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"https://github.com/vikiru/restasaurus/blob/main/app/models/DinosaurImage.js",children:(0,r.jsx)(n.strong,{children:"DinosaurImage"})}),": This model is used to store the image data related to a dinosaur, including the image source and attribution details."]}),"\n",(0,r.jsx)(n.p,{children:"An example of a DinosaurImage model is shown below."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'"image": {\r\n    "title": "Zephyrosaurus in Copenhagen",\r\n    "description": "Zephyrosaurus skeleton, Natural History Museum of Denmark, Copenhagen.",\r\n    "author": "FunkMonk",\r\n    "authorURL": "https://commons.wikimedia.org/wiki/User:FunkMonk",\r\n    "imageURL": "https://commons.wikimedia.org/wiki/File:Zephyrosaurus_in_Copenhagen.jpg",\r\n    "license": "Creative Commons Attribution-Share Alike 3.0",\r\n    "licenseURL": "https://creativecommons.org/licenses/by-sa/3.0",\r\n    "dateCreated": "2021-10-01T07:58:48.000Z",\r\n    "dateAccessed": "2024-01-30T14:27:20.683Z"\r\n},\n'})}),"\n",(0,r.jsx)(n.h2,{id:"-dinosaursource-model",children:"\ud83d\udcda DinosaurSource Model"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"https://github.com/vikiru/restasaurus/blob/main/app/models/DinosaurSource.js",children:(0,r.jsx)(n.strong,{children:"DinosaurSource"})}),": This model represents the source of the dinosaur data, which is the Wikipedia article for that particular dinosaur. This includes information such as the title, author, last revision date, revision history url, and more."]}),"\n",(0,r.jsx)(n.p,{children:"An example of a DinosaurSource model is shown below."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'"source": {\r\n    "pageTitle": "Zephyrosaurus",\r\n    "author": "Wikipedia contributors",\r\n    "wikipediaURL": "https://en.wikipedia.org/wiki/Zephyrosaurus",\r\n    "license": "Creative Commons Attribution-Share Alike 4.0",\r\n    "licenseURL": "https://creativecommons.org/licenses/by-sa/4.0/deed.en",\r\n    "permalink": "https://en.wikipedia.org/w/index.php?title=Zephyrosaurus&oldid=1187326953",\r\n    "revisionHistoryURL": "https://en.wikipedia.org/w/index.php?title=Zephyrosaurus&action=history",\r\n    "lastRevision": "2023-11-28T15:28:47Z",\r\n    "dateAccessed": "2024-01-30T14:27:20.682Z",\r\n    "source": "Wikipedia, The Free Encyclopedia",\r\n    "publisher": "Wikimedia Foundation",\r\n    "citation": "Wikipedia contributors. \\"Zephyrosaurus.\\" Wikipedia, The Free Encyclopedia. Wikimedia Foundation, 28 Nov 2023. Web. 30 Jan 2024."\r\n}\n'})})]})}function c(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>t,a:()=>a});var r=i(7294);const s={},o=r.createContext(s);function a(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);
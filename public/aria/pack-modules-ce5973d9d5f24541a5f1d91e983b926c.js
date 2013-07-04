/*
 * Aria Templates 1.4.4 - 22 May 2013
 *
 * Copyright 2009-2013 Amadeus s.a.s.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//***MULTI-PART
//*******************
//LOGICAL-PATH:aria/core/IOFilter.js
//*******************
Aria.classDefinition({$classpath:"aria.core.IOFilter",$constructor:function(t){this.requestDelay=t?t.requestDelay:null,this.responseDelay=t?t.responseDelay:null},$statics:{FILTER_REQ_ERROR:"An error occured in an IO filter:\ncall stack: onRequest\nclass: %1",FILTER_RES_ERROR:"An error occured in an IO filter:\ncall stack: onResponse\nclass: %1"},$prototype:{onRequest:function(t){null!=this.requestDelay&&(t.delay+=this.requestDelay)},onResponse:function(t){null!=this.responseDelay&&(t.delay+=this.responseDelay)},setJsonPostData:function(t,e){t.data="data="+aria.utils.Json.convertToJsonString(e,{encodeParameters:!0})},redirectToFile:function(t,e,i){e&&(t.url=aria.core.DownloadMgr.resolveURL(e,!0),i!==!0&&(t.url=aria.core.DownloadMgr.getURLWithTimestamp(t.url,!0)),t.method="GET",t.jsonp=null)},__onRequest:function(t){try{this.onRequest(t)}catch(e){this.$logError(this.FILTER_REQ_ERROR,[this.$classpath],e)}},__onResponse:function(t){try{this.onResponse(t)}catch(e){this.$logError(this.FILTER_RES_ERROR,[this.$classpath],e)}}}});
//*******************
//LOGICAL-PATH:aria/modules/requestHandler/environment/RequestHandlerCfgBeans.js
//*******************
Aria.beanDefinitions({$package:"aria.modules.requestHandler.environment.RequestHandlerCfgBeans",$namespaces:{json:"aria.core.JsonTypes"},$beans:{AppCfg:{$type:"json:Object",$restricted:!1,$properties:{requestHandler:{$type:"RequestHandlerCfg",$default:{implementation:"aria.modules.requestHandler.JSONRequestHandler"}},requestJsonSerializer:{$type:"RequestJsonSerializerCfg",$default:{options:{encodeParameters:!0,keepMetadata:!1}}}}},RequestHandlerCfg:{$type:"json:Object",$properties:{implementation:{$type:"json:PackageName",$default:null},args:{$type:"json:ObjectRef"}}},RequestJsonSerializerCfg:{$type:"json:Object",$properties:{instance:{$type:"json:ObjectRef"},options:{$type:"json:Map",$contentType:{$type:"json:MultiTypes"},$default:null}}}}});
//*******************
//LOGICAL-PATH:aria/modules/RequestBeans.js
//*******************
Aria.beanDefinitions({$package:"aria.modules.RequestBeans",$namespaces:{json:"aria.core.JsonTypes",env:"aria.modules.requestHandler.environment.RequestHandlerCfgBeans"},$beans:{RequestObject:{$type:"json:Object",$restricted:!1,$properties:{moduleName:{$type:"json:String",$mandatory:!0},actionName:{$type:"json:String",$mandatory:!1},serviceSpec:{$type:"json:ObjectRef",$mandatory:!1},session:{$type:"json:ObjectRef"},actionQueuing:{$type:"json:ObjectRef"},requestHandler:{$type:"json:ObjectRef"},urlService:{$type:"json:ObjectRef"},requestJsonSerializer:{$type:"env:RequestJsonSerializerCfg"},postHeader:{$type:"json:String"},headers:{$type:"json:Object"}}},RequestDetails:{$type:"json:Object",$restricted:!1,$properties:{url:{$type:"json:String",$mandatory:!0},method:{$type:"json:String"}}},SuccessResponse:{$type:"json:Object",$properties:{responseText:{$type:"json:String"},responseXML:{$type:"json:ObjectRef"},responseJSON:{$type:"json:ObjectRef"}}},FailureResponse:{$type:"json:Object",$properties:{status:{$type:"json:Integer",$mandatory:!0},error:{$type:"json:String"},responseText:{$type:"json:String"},responseXML:{$type:"json:ObjectRef"},responseJSON:{$type:"json:ObjectRef"}}},Request:{$type:"json:Object",$properties:{url:{$type:"json:String"},session:{$type:"json:ObjectRef"},requestObject:{$type:"RequestObject"}}},ProcessedResponse:{$type:"json:Object",$restricted:!1,$properties:{response:{$type:"json:ObjectRef"},error:{$type:"json:Boolean"},errorData:{$type:"json:ObjectRef"}}}}});
//*******************
//LOGICAL-PATH:aria/modules/queuing/SimpleSessionQueuing.js
//*******************
Aria.classDefinition({$classpath:"aria.modules.queuing.SimpleSessionQueuing",$constructor:function(){this._idSessionMap={},this._sessionQueues={}},$statics:{NO_SESSION_ID_KEY:"1"},$destructor:function(){this._idSessionMap=null;for(var t in this._sessionQueues)this._sessionQueues.hasOwnProperty(t)&&delete this._sessionQueues[t];this._sessionQueues=null},$prototype:{pushRequest:function(t,e,i){var r,n=t.session.id;if(n||(n=this.NO_SESSION_ID_KEY),this._sessionQueues[n]||(this._sessionQueues[n]=[]),r=this._sessionQueues[n],t.actionQueuing=this,r.length>0)return r.push({requestObject:t,jsonData:e,cb:i}),aria.modules.RequestMgr.QUEUE_STATUS;var a=this._sendRequest(t,e,i);return a===aria.modules.RequestMgr.ERROR_STATUS?a:(this._idSessionMap[a]=n,r.push(a),aria.modules.RequestMgr.EXECUTE_STATUS)},handleNextRequest:function(t){if(this._idSessionMap){var e,i,r=this._idSessionMap[t];if(r){delete this._idSessionMap[t];var n=this._sessionQueues[r];for(this.$assert(99,n&&n.length>0),this.$assert(100,n[0]===t),n.splice(0,1);n.length>0;){if(e=n[0],i=this._sendRequest(e.requestObject,e.jsonData,e.cb),i!==aria.modules.RequestMgr.ERROR_STATUS)return this._idSessionMap[i]=r,n[0]=i,void 0;n.splice(0,1)}}}},_sendRequest:function(t,e,i){return aria.modules.RequestMgr.sendJsonRequest(t,e,i)}}});
//*******************
//LOGICAL-PATH:aria/modules/urlService/environment/UrlServiceCfgBeans.js
//*******************
Aria.beanDefinitions({$package:"aria.modules.urlService.environment.UrlServiceCfgBeans",$namespaces:{json:"aria.core.JsonTypes"},$beans:{AppCfg:{$type:"json:Object",$restricted:!1,$properties:{urlService:{$type:"UrlServiceCfg",$default:{implementation:"aria.modules.urlService.PatternURLCreationImpl",args:["${moduleName}/${actionName}","${moduleName}"]}}}},UrlServiceCfg:{$type:"json:Object",$properties:{implementation:{$type:"json:PackageName",$default:null},args:{$type:"json:Array",$default:[],$contentType:{$type:"json:String"}}}}}});
//*******************
//LOGICAL-PATH:aria/modules/urlService/environment/UrlService.js
//*******************
Aria.classDefinition({$classpath:"aria.modules.urlService.environment.UrlService",$dependencies:["aria.modules.urlService.environment.UrlServiceCfgBeans"],$extends:"aria.core.environment.EnvironmentBase",$singleton:!0,$prototype:{_cfgPackage:"aria.modules.urlService.environment.UrlServiceCfgBeans.AppCfg",getUrlServiceCfg:function(){return aria.utils.Json.copy(this.checkApplicationSettings("urlService"))}}});
//*******************
//LOGICAL-PATH:aria/modules/requestHandler/environment/RequestHandler.js
//*******************
Aria.classDefinition({$classpath:"aria.modules.requestHandler.environment.RequestHandler",$dependencies:["aria.modules.requestHandler.environment.RequestHandlerCfgBeans"],$singleton:!0,$extends:"aria.core.environment.EnvironmentBase",$prototype:{_cfgPackage:"aria.modules.requestHandler.environment.RequestHandlerCfgBeans.AppCfg",getRequestHandlerCfg:function(){return aria.utils.Json.copy(this.checkApplicationSettings("requestHandler"))},getRequestJsonSerializerCfg:function(){return this.checkApplicationSettings("requestJsonSerializer")}}});
//*******************
//LOGICAL-PATH:aria/modules/RequestMgr.js
//*******************
Aria.classDefinition({$classpath:"aria.modules.RequestMgr",$dependencies:["aria.modules.queuing.SimpleSessionQueuing","aria.modules.RequestBeans","aria.modules.urlService.environment.UrlService","aria.modules.requestHandler.environment.RequestHandler","aria.utils.Type"],$singleton:!0,$events:{error:""},$constructor:function(){this.session={paramName:"jsessionid",id:""},this._params=null,this.defaultActionQueuing=new aria.modules.queuing.SimpleSessionQueuing,this._idCounter=1,this._urlService=null,this._requestHandler=null,aria.core.AppEnvironment.$on({changingEnvironment:{fn:this.__environmentUpdated,scope:this},environmentChanged:{fn:this.__environmentUpdated,scope:this}})},$destructor:function(){this._params=null,this._urlService&&(this._urlService.$dispose(),this._urlService=null),this._requestHandler&&(this._requestHandler.$dispose(),this._requestHandler=null),this.defaultActionQueuing&&(this.defaultActionQueuing.$dispose(),this.defaultActionQueuing=null)},$statics:{ERROR_STATUS:-1,EXECUTE_STATUS:0,QUEUE_STATUS:1,DISCARD_STATUS:2,INVALID_REQUEST_OBJECT:"Provided request object does not match aria.modules.RequestBeans.RequestObject.",FILTER_CREATION_ERROR:"An error occured while creating a Request filter:\nclass: %1",INVALID_BASEURL:"The base URL defined in the RequestMgr object is empty or invalid - please check: \nurl: %1",MISSING_SERVICESPEC:"Provided request object must contain an actionName or a serviceSpec element",CALLBACK_ERROR:"An error occured in the Request manager while processing the callback function.",INVALID_URL:"Url for request is invalid: %1"},$prototype:{addParam:function(e,t){if(null==t)return this.removeParam(e);null==this._params&&(this._params=[]);for(var i=0,r=this._params.length;r>i;i++){var n=this._params[i];if(n.name===e)return n.value=encodeURIComponent(t),void 0}this._params.push({name:e,value:encodeURIComponent(t)})},getParam:function(e){if(null==e||null==this._params)return null;for(var t=0,i=this._params.length;i>t;t++){var r=this._params[t];if(r.name===e)return r.value}return null},removeParam:function(e){if(null==e&&(this._params=null),null!=this._params)for(var t=0,i=this._params.length;i>t;t++){var r=this._params[t];r.name===e&&(this._params.splice(t,1),i--)}},submitJsonRequest:function(e,t,i){try{aria.core.JsonValidator.normalize({json:e,beanName:"aria.modules.RequestBeans.RequestObject"},!0)}catch(r){return this.$logError(this.INVALID_REQUEST_OBJECT,null,e),this.DISCARD_STATUS}return e.actionQueuing||(e.actionQueuing=this.defaultActionQueuing),e.session||(e.session=this.session),e.requestHandler||(e.requestHandler=this._requestHandler),e.actionQueuing.pushRequest(e,t,i)},__getHandlersDependencies:function(){var e=[],t=aria.modules.urlService.environment.UrlService;if(!this._urlService){var i=t.getUrlServiceCfg();e.push(i.implementation)}if(!this._requestHandler){var r=aria.modules.requestHandler.environment.RequestHandler.getRequestHandlerCfg();e.push(r.implementation)}return e},sendJsonRequest:function(e,t,i){var r={requestObject:e,jsonData:t,data:null,method:"POST"},n=this._idCounter++,a=this.__getHandlersDependencies(),s={req:r,cb:i,id:n,session:e.session,actionQueuing:e.actionQueuing,requestHandler:e.requestHandler};return Aria.load({classes:a,oncomplete:{fn:this._onDependenciesReady,scope:this,args:s}}),n},_onDependenciesReady:function(e){var t=e.req,i=this.createRequestDetails(t.requestObject,e.session);return i&&""!==i.url?(t.url=i.url,i.method&&(t.method=i.method),this._callAsyncRequest(e),void 0):this.$logError(this.INVALID_URL,[""])},_callAsyncRequest:function(e){var t=e.req,i=e.requestHandler;null==i&&(i=this.__getRequestHandler()),t.data=null==t.data&&"POST"==t.method?i.prepareRequestBody(t.jsonData,t.requestObject):t.data,t.headers=i.getRequestHeaders();var r={classpath:this.$classpath,requestObject:t.requestObject,requestData:t.jsonData,responseData:null,responseErrorData:null},n={sender:r,url:t.url,method:t.method,postData:t.data,headers:t.headers,callback:{fn:this._onresponse,onerror:this._onresponse,scope:this,args:{requestObject:t.requestObject,senderObject:r,cb:e.cb,id:e.id,session:e.session,actionQueuing:e.actionQueuing,requestHandler:i}}};t.postHeader&&(n.postHeader=t.postHeader),i.expectedResponseType&&(n.expectedResponseType=i.expectedResponseType),aria.core.IO.asyncRequest(n)},_onresponse:function(e,t){var i=(t.cb,t.requestObject),r=t.actionQueuing,n=t.id,a=(t.session,t.requestHandler,t.senderObject);r&&r.handleNextRequest(n);var s={requestUrl:e.url,requestObject:i,responseXML:e.responseXML,responseText:e.responseText,responseJSON:e.responseJSON,status:e.status,error:e.error,data:a.responseData,errorData:a.responseErrorData};t.res=s,this._processOnResponse(t)},_processOnResponse:function(e){e.cb;var t=e.res,i=e.requestHandler;t.error?i.processFailure({error:t.error,status:t.status,responseXML:t.responseXML,responseText:t.responseText,responseJSON:t.responseJSON},{url:e.res.url,session:e.session,requestObject:e.requestObject},{fn:this._callRequestCallback,scope:this,args:e}):i.processSuccess({responseXML:t.responseXML,responseText:t.responseText,responseJSON:t.responseJSON},{url:t.url,session:e.session,requestObject:e.requestObject},{fn:this._callRequestCallback,scope:this,args:e})},_callRequestCallback:function(e,t){var i=t.res;if(i.errorData&&(e.error=!0),i.data&&(e.data=i.data),i.errorData&&(e.errorData=i.errorData),e.error){var r={name:"error",requestUrl:i.requestUrl,requestObject:t.requestObject,errorData:e.errorData};i.error&&(r.httpError={error:i.error,status:i.status}),this.$raiseEvent(r)}this.$callback(t.cb,e,this.CALLBACK_ERROR)},createRequestDetails:function(e,t){var i=aria.utils.Type,r=e.urlService;r||(r=this.__getUrlService()),this.$assert(434,null!=r),t||(t=this.session);var n,a=e.moduleName.replace(/\./g,"/");if(i.isString(e.actionName)){var s=this.__extractActionName(e.actionName);n=r.createActionUrl(a,s.name,t.id)}else{if(!e.serviceSpec)return this.$logError(this.MISSING_SERVICESPEC,[n]),null;n=r.createServiceUrl(a,e.serviceSpec,t.id)}return!n||i.isObject(n)&&!n.url?(this.$logError(this.INVALID_BASEURL,[n]),null):(i.isString(n)&&(n={url:n}),n.method||(n.method="POST"),e.actionName&&(n.url=this.__appendActionParameters(n.url,s.params)),n.url=this.__appendGlobalParams(n.url,this._params),n)},createI18nUrl:function(e,t,i){var r=aria.modules.urlService.environment.UrlService.getUrlServiceCfg();Aria.load({classes:[r.implementation],oncomplete:{fn:this.__onI18nReady,scope:this,args:{moduleName:e,locale:t,callback:i}}})},__onI18nReady:function(e){var t=this.__getUrlService();this.$assert(595,null!=t);var i=t.createI18nUrl(e.moduleName,this.session.id,e.locale);i=this.__appendGlobalParams(i,this._params),e.callback.args=e.callback.args||{},e.callback.args.full=i,this.$callback(e.callback)},__appendGlobalParams:function(e,t){if(!t||0===t.length)return e;for(var i=[],r=0,n=t.length;n>r;r+=1){var a=t[r];i.push(a.name+"="+a.value)}var s="&",o=i.join(s);return this.__appendActionParameters(e,o)},__appendActionParameters:function(e,t){if(e=e||"",!t)return e;var i=e.indexOf("?"),r="&";return e+=i>-1?r:"?",e+t},__extractActionName:function(e){e=e||"";var t=e.indexOf("?"),i={name:"",params:""};return 0>t?i.name=e:i={name:e.substring(0,t),params:e.substring(t+1)},i},__getUrlService:function(){if(!this._urlService){var e=aria.modules.urlService.environment.UrlService.getUrlServiceCfg(),t=e.args[0],i=e.args[1],r=Aria.getClassRef(e.implementation);this._urlService=new r(t,i)}return this._urlService},__getRequestHandler:function(){if(!this._requestHandler){var e=aria.modules.requestHandler.environment.RequestHandler.getRequestHandlerCfg();this._requestHandler=Aria.getClassInstance(e.implementation,e.args)}return this._requestHandler},__environmentUpdated:function(e){return"environmentChanged"==e.name?(this._urlService&&(this._urlService.$dispose(),this._urlService=null),this._requestHandler&&(this._requestHandler.$dispose(),this._requestHandler=null),void 0):void 0}}});
//*******************
//LOGICAL-PATH:aria/modules/requestHandler/IRequestHandler.js
//*******************
Aria.interfaceDefinition({$classpath:"aria.modules.requestHandler.IRequestHandler",$interface:{processSuccess:function(){},processFailure:function(){},prepareRequestBody:function(){},serializeRequestData:function(){},expectedResponseType:{$type:"Object"},getRequestHeaders:function(){}}});
//*******************
//LOGICAL-PATH:aria/modules/requestHandler/RequestHandler.js
//*******************
Aria.classDefinition({$classpath:"aria.modules.requestHandler.RequestHandler",$implements:["aria.modules.requestHandler.IRequestHandler"],$dependencies:["aria.modules.requestHandler.environment.RequestHandler"],$statics:{HTTP_ERRORS_GENERAL:"An uncatalogued HTTP error was generated",HTTP_ERRORS_400:"400 Bad Request: The request cannot be fulfilled due to bad syntax.",HTTP_ERRORS_401:"401 Unauthorized: Similar to 403 Forbidden, but specifically for use when authentication is possible but has failed or not yet been provided.",HTTP_ERRORS_403:"403 Forbidden: The request was a legal request, but the server is refusing to respond to it.",HTTP_ERRORS_404:"404 Not Found: The requested resource could not be found but may be available again in the future.  Subsequent requests by the client are permissible.",HTTP_ERRORS_500:"500 Internal Server Error: A generic error message, given when no more specific message is suitable."},$constructor:function(){this._requestJsonSerializer=aria.modules.requestHandler.environment.RequestHandler.getRequestJsonSerializerCfg(),aria.core.AppEnvironment.$on({changingEnvironment:{fn:this.__environmentUpdated,scope:this},environmentChanged:{fn:this.__environmentUpdated,scope:this}})},$destructor:function(){this._requestJsonSerializer=null},$prototype:{headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},processSuccess:function(e,t,i){this.$callback(i,e)},processFailure:function(e,t,i){var r=e.status,n={response:{responseText:e.responseText,responseJSON:e.responseJSON,responseXML:e.responseXML},error:!0},a="HTTP_ERRORS_"+r,s=this[a];s||(s=this.HTTP_ERRORS_GENERAL),n.errorData={messageBean:{code:r,localizedMessage:s,type:"HTTPERROR"}},this.$callback(i,n)},prepareRequestBody:function(e,t){return this.serializeRequestData(e,t)},serializeRequestData:function(e,t){var i=t?t.requestJsonSerializer:null,r=i?i.options:null,n=i?i.instance:null;return n?aria.utils.Json.convertToJsonString(e,aria.utils.Json.copy(r,!0),n):(r=r||this._requestJsonSerializer.options,n=this._requestJsonSerializer.instance,aria.utils.Json.convertToJsonString(e,aria.utils.Json.copy(r,!0),n))},getRequestHeaders:function(){return this.headers},__environmentUpdated:function(){this._requestJsonSerializer=aria.modules.requestHandler.environment.RequestHandler.getRequestJsonSerializerCfg()}}});
//*******************
//LOGICAL-PATH:aria/modules/requestHandler/JSONRequestHandler.js
//*******************
Aria.classDefinition({$classpath:"aria.modules.requestHandler.JSONRequestHandler",$extends:"aria.modules.requestHandler.RequestHandler",$implements:["aria.modules.requestHandler.IRequestHandler"],$statics:{PARSING_ERROR:"Response text could not be evaluated as JSON."},$prototype:{expectedResponseType:"json",headers:{"Content-Type":"application/json"},processSuccess:function(e,t,i){var r={};e.responseJSON?r.response=e.responseJSON:e.responseText?(r.response=aria.utils.Json.load(e.responseText,this,this.PARSING_ERROR),r.response||(r.error=!0),r.error&&(r.errorData={messageBean:{localizedMessage:this.PARSING_ERROR,type:"PARSINGERROR"}})):r.response=null,this.$callback(i,r)}}});
//*******************
//LOGICAL-PATH:aria/modules/requestHandler/XMLRequestHandler.js
//*******************
Aria.classDefinition({$classpath:"aria.modules.requestHandler.XMLRequestHandler",$extends:"aria.modules.requestHandler.RequestHandler",$implements:["aria.modules.requestHandler.IRequestHandler"],$statics:{MIMETYPE_ERROR:"Response type is badly configured, it should have returned a xml response."},$prototype:{processSuccess:function(e,t,i){var r;r=!e.responseXML||e.responseXML&&!e.responseXML.documentElement?{response:null,error:!0,errorData:{messageBean:{localizedMessage:this.MIMETYPE_ERROR,type:"TYPEERROR"}}}:this.processXMLDocument(e.responseXML.documentElement,t),this.$callback(i,r)},processXMLDocument:function(e){return{response:e}}}});
//*******************
//LOGICAL-PATH:aria/modules/urlService/IUrlService.js
//*******************
Aria.interfaceDefinition({$classpath:"aria.modules.urlService.IUrlService",$interface:{createActionUrl:function(){},createServiceUrl:function(){},createI18nUrl:function(){}}});
//*******************
//LOGICAL-PATH:aria/modules/urlService/PatternURLCreationImpl.js
//*******************
Aria.classDefinition({$classpath:"aria.modules.urlService.PatternURLCreationImpl",$implements:["aria.modules.urlService.IUrlService"],$constructor:function(e,t){this.actionUrlPattern=e||"",this.i18nUrlPattern=t||""},$destructor:function(){},$prototype:{createActionUrl:function(e,t,i){var r=this.actionUrlPattern;return r=r.replace(/\$\{moduleName\}/g,e||""),r=r.replace(/\$\{actionName\}/g,t||""),r=r.replace(/\$\{sessionId\}/g,i||"")},createServiceUrl:function(e,t,i){return t&&t.actionName?this.createActionUrl(e,t.actionName,i):this.createActionUrl(e,null,i)},createI18nUrl:function(e,t,i){var r=this.i18nUrlPattern;return r=r.replace(/\$\{moduleName\}/g,e||""),r=r.replace(/\$\{sessionId\}/g,t||""),r=r.replace(/\$\{locale\}/g,i||"")}}});
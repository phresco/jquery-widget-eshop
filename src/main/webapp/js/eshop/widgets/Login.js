/*
 * PHR_jquerywidget
 *
 * Copyright (C) 1999-2013 Photon Infotech Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*global define, $, window */

define( "eshop/widgets/Login", [ "jquery", "framework/Clazz", "framework/Widget" ], function($, Clazz, Widget) {

    function Login() {
    }

    Login.prototype = new Clazz();    
    Login.prototype = new Widget(); 

    Login.prototype.mainNode = undefined;
    Login.prototype.mainContent = undefined;
    Login.prototype.hideItems = undefined;
    Login.prototype.listener = undefined;
    Login.prototype.api = undefined;
    Login.prototype.phrescoapi = undefined;

    Login.prototype.initialize = function(container, listener, api, phrescoapi) {
        listener.subscribe("Login", this, "onHashChange");
        this.mainNode = container;
        this.hideItems = [];
        this.listener = listener;
        this.api = api;
        this.phrescoapi = phrescoapi;
    };

    Login.prototype.setMainContent = function() {
        var mainContent = $('<div></div>'),
        contactus = $('<div id="maincontact">'),
        selection = $('<section id="contact">'),
        divleft = $('<div id="">'),
        h3title = $('<h3> Login </h3>'),
        contactdescrip = $('<div class="contactdescrip">'),
        emailfieldset = $('<fieldset>'),
        emailDiv = $('<div id="logEmail_err_div" class="clearfix">'),
        emailField = $('<label for="loginEmail"><span>Email *</span><input type="text" name="logEmail" id="logEmail" placeholder="Email"  /></label><span class="help-inline" id="logEmail_err"></span>'),
        passwordDiv = $('<div id="logpassword_err_div" class="clearfix">'),
        passwordField = $('<label for="password"><span>Password *</span><input type="password" name="logpassword" id="logpassword" placeholder="Password"  /></label><span class="help-inline" id="logpassword_err"></span>'),
        footer = $('<div>'),
        buttonsDiv = $('<div class="buttonsdiv">'),
        submitButton = $('<input type="submit" value="Submit" class="buttonstyle" id="ok"/>'),
        cancelButton = $('<input id="cancel" type="button" value="Cancel" class="buttonstyle"/>'),
        cleardiv = $('<div class="clear"></div>'),
        self = this;

        $(submitButton).bind('click', {categoryId:0} , function(event){
            self.hideItems = ['Login'];
            if(self.phrescoapi.userLogin() === true){
				self.loginTest(self.phrescoapi.logindata);
                self.phrescoapi.hideWidget(self.hideItems);
                self.listener.publish(event,"LoginSuccess",[event.data]);
                self.listener.publish(event,"Navigation",[event.data]);
            }
        });

        emailDiv.append(emailField);
        passwordDiv.append(passwordField);
            
        buttonsDiv.append(submitButton);
        buttonsDiv.append(cancelButton);
        footer.append(buttonsDiv); 

        emailfieldset.append(emailDiv);
        emailfieldset.append(passwordDiv);
        emailfieldset.append(footer);  
        
        contactdescrip.append(emailfieldset);
        
        divleft.append(h3title);   
        divleft.append(contactdescrip);    
        divleft.append(cleardiv);
        selection.append(divleft);
        contactus.append(selection);
        mainContent.append(contactus);     
        this.mainContent = mainContent;

    };
	
	Login.prototype.loginTest = function(logindata) {
		var obj, self = this;
		obj = self.api.doLogin(logindata);
		return self.api.loginresponse.message;
	};

    Login.prototype.renderUI = function() {
        this.setMainContent();
        this.mainContent.show();
        return this.mainContent;
    };
    
    Login.prototype.onHashChange = function(event,data) {
        this.render(this.mainNode);
        this.mainNode.show();
    };

    Login.prototype.hideWidget = function() {
        this.mainNode.hide();
    };

    return Login;
});

/**
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
package com.photon.phresco.uiconstants;


import java.lang.reflect.Field;

public class UIConstants {
	

private ReadXMLFile readXml;

   //registration
	public String SIGNUP_LINK="signup_link";
	public String REG_FIRSTNAME ="regfirstname";
	public String REG_LASTNAME="reglastname";
	public String REG_EMAIL="regemail";
	public String REG_PASSWORD="regpassword";
	public String REG_PHONENUMBER="regphonenumber";
	public String REG_SUBMIT_BUTTON="regsubmitbutton";
	
	public String TELEVISION = "televisiontab";
	public String COMPUTERS = "computerstab";
	public String MOBILE = "mobiletab";
	public String AUDIO_DEVICES = "audioDevicestab";
	public String CAMERAS = "camerastab";
	public String TABLETS = "tabletstab";
	public String MOVIESnMUSIC = "moviesNmusictab";
	public String VIDEOGAMES = "videoGamestab";
	public String MP3PLAYERS = "mp3Playerstab";
	public String ACCESSORIES = "accessoriestab";
	public String MORE = "moretab";
	//public String SEARCH = "search";
	public String HOME = "hometab";
	public String PROD1_DETAILS="prod1Details";
	//public String PROD1_AUDIO="prod1AudioDevices";
	public String UPDATECART="updateCart";
	public String ADDTOCART="addToCart"; 
	public String DET_ADDTOCART="prod1DetailAddToCart";
	public String CHECKOUT="checkout";
	public String REVIEWORDER="reviewOrder";
	public String SUBMITORDER="submitOrder";
	public String EMAIL="billInfoEmail";
	public String FIRSTNAME="billInfoFirstName";
	public String LASTNAME="billInfoLastName";
	public String COMPANY="billInfoCompany";
	public String ADDRESS1="billInfoAddress1";
	public String ADDRESS2="billInfoAddress2";
	public String CITY="billInfoCity";
	public String STATE="billInfoState";
	public String POSTALCODE="billInfoPostCode";
	public String PHONENUMBER="billInfoPhoneNumber";
	public String CARDTYPE="cardInfoCardType";
	public String CARDNUMBER="cardInfoCardNumber";
	public String SECURITYNUMBER="cardInfoSecurityNumber";
	public String NAMEONCARD="cardInfoNameOnCard";
	public String COMMENTS="billInfoComments";
	
	
	public UIConstants() {
		try {
			readXml = new ReadXMLFile();
			readXml.loadUIConstants();
			Field[] arrayOfField1 = super.getClass().getFields();
			Field[] arrayOfField2 = arrayOfField1;
			int i = arrayOfField2.length;
			for (int j = 0; j < i; ++j) {
				Field localField = arrayOfField2[j];
				Object localObject = localField.get(this);
				if (localObject instanceof String)
					localField
							.set(this, readXml.getValue((String) localObject));

			}
		} catch (Exception localException) {
			throw new RuntimeException("Loading "
					+ super.getClass().getSimpleName() + " failed",
					localException);
		}
	}
}

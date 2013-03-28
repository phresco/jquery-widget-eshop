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
/*global $, require */

// When the document is ready:
$().ready(function() {

	require(  [ "eshop/widgets/EShopAPI", "eshop/widgets/Phresco", "framework/Listener", "eshop/widgets/AboutusBootstrap", "eshop/widgets/NavigationBootstrap", "eshop/widgets/SearchBootstrap", "eshop/widgets/CategoryBootstrap", "eshop/widgets/ProductBootstrap", "eshop/widgets/OrderFormBootstrap", "eshop/widgets/OrderFormViewBootstrap", "eshop/widgets/OrderHistoryBootstrap", "eshop/widgets/MyCartBootstrap", "eshop/widgets/NewproductsBootstrap", "eshop/widgets/ProductDetailsBootstrap", "eshop/widgets/ShoppingCartBootstrap", "eshop/widgets/ContactusBootstrap", "eshop/widgets/RegisterSuccessBootstrap", "eshop/widgets/LoginBootstrap", "eshop/widgets/RegisterBootstrap", "eshop/widgets/OrderSuccessBootstrap", "eshop/widgets/LoginSuccessBootstrap" ], function(   EShopAPI, 
					Phresco, 
					Listener, 
					AboutusBootstrap, 
					NavigationBootstrap, 
					SearchBootstrap, 
					CategoryBootstrap, 
					ProductBootstrap, 
					OrderFormBootstrap, 
					OrderFormViewBootstrap, 
					OrderHistoryBootstrap, 
					MyCartBootstrap, 
					NewproductsBootstrap, 
					ProductDetailsBootstrap, 
					ShoppingCartBootstrap, 
					ContactusBootstrap, 
					RegisterSuccessBootstrap, 
					LoginBootstrap, 
					RegisterBootstrap, 
					OrderSuccessBootstrap,
					LoginSuccessBootstrap) {

		var api, 
		phresco, 
		listener, 
		aboutusBootstrap, 
		navigationBootstrap, 
		searchBootstrap, 
		categoryBootstrap, 
		hideItems, 
		productBootstrap, 
		orderFormBootstrap, 
		orderFormViewBootstrap, 
		orderHistoryBootstrap, 
		myCartBootstrap, 
		newproductsBootstrap, 
		productDetailsBootstrap,
		shoppingCartBootstrap, 
		contactusBootstrap, 
		registerSuccessBootstrap, 
		loginBootstrap, 
		registerBootstrap, 
		orderSuccessBootstrap,
		loginSuccessBootstrap;

		listener = new Listener();

		api = new EShopAPI();
        api.initialize(this.configJsonData);
		
		phresco = new Phresco();
		phresco.initialize(listener, api);

		navigationBootstrap = new NavigationBootstrap();
		navigationBootstrap.init(listener, api, phresco);

		searchBootstrap = new SearchBootstrap();
		searchBootstrap.init(listener, api, phresco);

		categoryBootstrap = new CategoryBootstrap();
		categoryBootstrap.init(listener, api, phresco);

		productBootstrap = new ProductBootstrap();
		productBootstrap.init(listener, api, phresco);

		orderFormBootstrap = new OrderFormBootstrap();
		orderFormBootstrap.init(listener, api, phresco);

		orderFormViewBootstrap = new OrderFormViewBootstrap();
		orderFormViewBootstrap.init(listener, api, phresco);

		orderHistoryBootstrap = new OrderHistoryBootstrap();
		orderHistoryBootstrap.init(listener, api, phresco);

		orderSuccessBootstrap = new OrderSuccessBootstrap();
		orderSuccessBootstrap.init(listener, api, phresco);

		myCartBootstrap = new MyCartBootstrap();
		myCartBootstrap.init(listener, api, phresco);

		newproductsBootstrap = new NewproductsBootstrap();
		newproductsBootstrap.init(listener, api, phresco);

		productDetailsBootstrap = new ProductDetailsBootstrap();
		productDetailsBootstrap.init(listener, api, phresco);

		shoppingCartBootstrap = new ShoppingCartBootstrap();
		shoppingCartBootstrap.init(listener, api, phresco);

		aboutusBootstrap = new AboutusBootstrap();
		aboutusBootstrap.init(listener, api, phresco);

		contactusBootstrap = new ContactusBootstrap();
		contactusBootstrap.init(listener, api, phresco);

		registerSuccessBootstrap = new RegisterSuccessBootstrap();
		registerSuccessBootstrap.init(listener, api, phresco);

		loginBootstrap = new LoginBootstrap();
		loginBootstrap.init(listener, api, phresco);
		
		loginSuccessBootstrap = new LoginSuccessBootstrap();
		loginSuccessBootstrap.init(listener, api, phresco);

		registerBootstrap = new RegisterBootstrap();
		registerBootstrap.init(listener, api, phresco);

		hideItems = ['ProductDetails','ShoppingCart','OrderFormView','OrderForm','Login','OrderSuccess','Aboutus','Contactus','Register','LoginSuccess','RegisterSuccess','OrderHistory'];
        phresco.hideWidget(hideItems);
	});
});

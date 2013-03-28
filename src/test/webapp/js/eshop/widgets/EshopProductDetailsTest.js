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
/*global require*/

require([ "jquery", "eshop/widgets/ProductDetails", "eshop/widgets/EShopAPI", "eshop/widgets/WSConfig"], function($, ProductDetails, EShopAPI, WSConfig) {

//var equal = QUnit.equal, expect = QUnit.expect, notEqual = QUnit.notEqual, testWithSameProductId = QUnit.test, testWithDifferentProductId = QUnit.test, wsconfig;
	
	module("ProductDetails.js;ProductDetails");
	asyncTest("Test Product details with same ProductID.", function() {
	
		var self = this, mainContent, topH3, productContainer, productDetails, productname, productimageholder,
		detailImage, productimage, productdetail_info, review, ratingDone, i, starImage, star,
		reviewLink, prdprice, save, listprice, sellprice, saveprice, stockavailablity, availability, quantity, buttonactions, data, desc, pdesc,
		tabwrapper, tab1, tab2, clear, tabactive, tabtext, frm, fielset, label1, label2, postreviewbutton, productReviews, reviewData, tabdesc,
		ratingStarSpan, starImage1, starValue, starValueBox, obj, loginAlertForm, productId, productdetail, api, listener, output1, output2, pid, wsconfig, wsURL;
		
		productdetail = new ProductDetails();
		wsconfig = new WSConfig();
		wsconfig.getEnvironment(function(wsURL) {
			api = new EShopAPI();
			api.initialize(wsURL); 
			productdetail.api = api;
			productdetail.productId = 12;
		});
		
		
		setTimeout(function() {
			 start();
			output1 = productdetail.testRenderUI();
			
			pid = 12;
			mainContent = $('<div></div>');
			topH3 = $('<h3>Product Details</h3>');
			productContainer = $('<div class="productcontainer">');

			api.getProductDetails(pid, function(jsonObject){
				if(jsonObject.message === 'Product id unavailable'){
					return;
				}
				productDetails = jsonObject.product[0];
				productname = $('<h4>'+ productDetails.name +'</h4>');
				productimageholder = $('<div class="productimageholder" style="position: relative;">');
				detailImage = "images/eshop/"+productDetails.image;
				productimage=$('<img src="' + api.wsURLWithoutContext + '/images/web/' + productDetails.image + '" alt="" width="200" height="200" >');
				productimageholder.append(productimage);
				productdetail_info = $('<div class="productdetail_info">');
				review = $('<div class="review">');
				ratingDone = false;
				for (i = 0; i < 5; i++) {
					starImage = 'red_star.png';

					if (productDetails.rating === i) {
						ratingDone = true;
					}
					if (ratingDone === true) {
						starImage = 'white_star.png';
					}
					star = $('<span ><img src="images/eshop/' + starImage + ' " width="16" height="16" alt="Red star"></span>');
					review.append(star);
				}
				reviewLink = $('<span class="writeriew"><a href="#readreview">( Reviews )</a></span>');
				review.append(reviewLink);
				prdprice= $('<div class="productdetail_price">');
				save = productDetails.listPrice - productDetails.sellPrice;
				listprice = $('<div><span class="st">List price :</span><span class="st1">$'+productDetails.listPrice +'</span></div>');
				sellprice = $('<div><span class="st2">Sell at :</span><span class="st2">$'+productDetails.sellPrice +'</span></div>');
				saveprice = $('<div><span class="st4">You save :</span><span class="st3">$'+ save +'</span></div>');
				prdprice.append(listprice);
				prdprice.append(sellprice);
				prdprice.append(saveprice); 
				
				stockavailablity = $('<div class="stockavailablity">');
				availability = $('<div class="row1"><span class="st">Availability:</span><span class="st">In Stock</span></div>');
				quantity = $('<div class="row1"><span class="st">Quantity:</span><span class="st1"><input type="text" value="1" placeholder="0" size="1"></span></div>');
				buttonactions = $('<div class="buttonactions"><a href="#"><img src="images/eshop/addtocart_btn_greycolor.png" width="105" height="36" alt="add to cart"></a></div>');
				stockavailablity.append(availability);
				stockavailablity.append(quantity);
				stockavailablity.append(buttonactions);
				
				desc = $('<div><h4 class="descrip"> Description</h4>');
				pdesc = $('<p>'+ productDetails.description+'</p>');
				desc.append(pdesc);

				tabwrapper = $('<div id="tabs_wrapper">');

				tab1 = $('<a href="#readreview" class="tab_link tab_link_selected" title="#readreview" id="readReviewLink">Read reviews</a>');
				tab2 = $('<a href="#writeareview" class="tab_link" title="#writeareview" id="writeReviewLink">write a review</a>');
				clear = $('<div class="clear"></div> ');              
				tabactive = $('<div class="tab_text" id="readreview_Div" style="display:block;" >');

				api.getProductReviews(pid, function(productReviewData){
					productReviews = productReviewData.review.comments;
					for (i = 0; i < productReviews.length; i++) {
						reviewData = productReviews[i];
						tabdesc = $('<p> '+reviewData.user +' : '+ reviewData.comment+' </p></br>');
						tabactive.append(tabdesc);
					}				
				});  

				tabtext =  $('<div class="tab_text" id="writeareview_Div" style="display:none;" >');
				frm = $('<div></div>');
				fielset = $('<fieldset>'); 
				label1 = $('<label for="name"><span>Rate this</span></label>');
					ratingStarSpan = $('<span class="ratingStarSpan"></span>');
					
					for (i = 1; i <= 5; i++) {
						starImage1 = 'white_star.png';
						starValue = $('<a href="javascript:void(0);" id="starImage_'+i+'" name="starImage_'+i+'"><img src="images/eshop/white_star.png" width="16" height="16" title="' + i + '"></a>');
						data = i;
						ratingStarSpan.append(starValue);
					}
					starValueBox = $('<input type="hidden" name="starValue" id="starValue" size="2">');
					productId = $('<input type="hidden" name="productId" id="productId" value="'+productDetails.id+'">');
					label1.append(starValueBox);
					label1.append(productId);
					label1.append(ratingStarSpan);
					label1.append(ratingStarSpan);
				
				label2 = $('<label for="comments"><span>Comments</span><textarea name="comments" id="comments" placeholder="Your comments"cols="5" rows="6" scale="no"></textarea></label>');
				fielset.append(label1);
				fielset.append(label2);
				frm.append(fielset);

				postreviewbutton = $('<div class="postreviewbutton"><input type="submit" value="submit" class="buttonstyle"/></div>');
				frm.append(postreviewbutton);
				loginAlertForm = $('<label for="name"><span>Please login to post review</span></label>');
				
				if(api.loginresponse){
					if(api.loginresponse.userId === undefined){
						tabtext.append(loginAlertForm);
					}else{
						tabtext.append(frm);
					}
				}	

				tabwrapper.append(tab1);
				tabwrapper.append(tab2);
				tabwrapper.append(clear);
				tabwrapper.append(tabactive);
				tabwrapper.append(tabtext);
				productdetail_info.append(review); 
				productdetail_info.append(prdprice); 
				productdetail_info.append(stockavailablity); 
				productContainer.append(productname);
				productContainer.append(productimageholder);
				productContainer.append(productdetail_info);
				productContainer.append(desc);
				productContainer.append(tabwrapper);
			});  

			mainContent.append(topH3);  
			mainContent.append(productContainer);
			
			output2 = mainContent;
			equal(output1.html(), output2.html(), "Test Product details with same ProductID - Test case passed"); 
		}, 1500);
	});
	
	asyncTest("Test Product details with different Product ID.", function() {
	
		var self = this, mainContent, topH3, productContainer, productDetails, productname, productimageholder,
		detailImage, productimage, productdetail_info, review, ratingDone, i, starImage, star,
		reviewLink, prdprice, save, listprice, sellprice, saveprice, stockavailablity, availability, quantity, buttonactions, data, desc, pdesc,
		tabwrapper, tab1, tab2, clear, tabactive, tabtext, frm, fielset, label1, label2, postreviewbutton, productReviews, reviewData, tabdesc,
		ratingStarSpan, starImage1, starValue, starValueBox, obj, loginAlertForm, productId, productdetail, api, listener, output1, output2, pid, wsconfig, wsURL;
		
		productdetail = new ProductDetails();
		wsconfig = new WSConfig();
		wsconfig.getEnvironment(function(wsURL) {
			api = new EShopAPI();
			api.initialize(wsURL); 
			productdetail.api = api;
			productdetail.productId = 12;
		});
		
		setTimeout(function() {
			 start();
			output1 = productdetail.testRenderUI();

			pid = 11;
			mainContent = $('<div></div>');
			topH3 = $('<h3>Product Details</h3>');
			productContainer = $('<div class="productcontainer">');
			
			api.getProductDetails(pid, function(jsonObject){
				if(jsonObject.message === 'Product id unavailable'){
					return;
				}

				productDetails = jsonObject.product[0];
				productname = $('<h4>'+ productDetails.name +'</h4>');
				productimageholder = $('<div class="productimageholder" style="position: relative;">');
				detailImage = "images/eshop/"+productDetails.image;
				productimage=$('<img src="' + api.wsURLWithoutContext + '/images/web/' + productDetails.image + '" alt="" width="200" height="200" >');
				productimageholder.append(productimage);
				productdetail_info = $('<div class="productdetail_info">');
				review = $('<div class="review">');
				ratingDone = false;
				
				for (i = 0; i < 5; i++) {
					starImage = 'red_star.png';
					if (productDetails.rating === i) {
						ratingDone = true;
					}
					if (ratingDone === true) {
						starImage = 'white_star.png';
					}
					star = $('<span ><img src="images/eshop/' + starImage + ' " width="16" height="16" alt="Red star"></span>');
					review.append(star);
				}

				reviewLink = $('<span class="writeriew"><a href="#readreview">( Reviews )</a></span>');
				review.append(reviewLink);
				prdprice= $('<div class="productdetail_price">');
				save = productDetails.listPrice - productDetails.sellPrice;
				listprice = $('<div><span class="st">List price :</span><span class="st1">$'+productDetails.listPrice +'</span></div>');
				sellprice = $('<div><span class="st2">Sell at :</span><span class="st2">$'+productDetails.sellPrice +'</span></div>');
				saveprice = $('<div><span class="st4">You save :</span><span class="st3">$'+ save +'</span></div>');
				prdprice.append(listprice);
				prdprice.append(sellprice);
				prdprice.append(saveprice); 
				
				stockavailablity = $('<div class="stockavailablity">');
				availability = $('<div class="row1"><span class="st">Availability:</span><span class="st">In Stock</span></div>');
				quantity = $('<div class="row1"><span class="st">Quantity:</span><span class="st1"><input type="text" value="1" placeholder="0" size="1"></span></div>');
				buttonactions = $('<div class="buttonactions"><a href="#"><img src="images/eshop/addtocart_btn_greycolor.png" width="105" height="36" alt="add to cart"></a></div>');
				stockavailablity.append(availability);
				stockavailablity.append(quantity);
				stockavailablity.append(buttonactions);
				desc = $('<div><h4 class="descrip"> Description</h4>');
				pdesc = $('<p>'+ productDetails.description+'</p>');
				desc.append(pdesc);
				tabwrapper = $('<div id="tabs_wrapper">');
				tab1 = $('<a href="#readreview" class="tab_link tab_link_selected" title="#readreview" id="readReviewLink">Read reviews</a>');
				tab2 = $('<a href="#writeareview" class="tab_link" title="#writeareview" id="writeReviewLink">write a review</a>');
				clear = $('<div class="clear"></div> ');              
				tabactive = $('<div class="tab_text" id="readreview_Div" style="display:block;" >');

				api.getProductReviews(pid, function(productReviewData){
					productReviews = productReviewData.review.comments;
					for (i = 0; i < productReviews.length; i++) {
						reviewData = productReviews[i];
						tabdesc = $('<p> '+reviewData.user +' : '+ reviewData.comment+' </p></br>');
						tabactive.append(tabdesc);
					}				
				});  

				tabtext =  $('<div class="tab_text" id="writeareview_Div" style="display:none;" >');
				frm = $('<div></div>');
				fielset = $('<fieldset>'); 
				label1 = $('<label for="name"><span>Rate this</span></label>');
					ratingStarSpan = $('<span class="ratingStarSpan"></span>');
					
					for (i = 1; i <= 5; i++) {
						starImage1 = 'white_star.png';
						starValue = $('<a href="javascript:void(0);" id="starImage_'+i+'" name="starImage_'+i+'"><img src="images/eshop/white_star.png" width="16" height="16" title="' + i + '"></a>');
						ratingStarSpan.append(starValue);
					}
					starValueBox = $('<input type="hidden" name="starValue" id="starValue" size="2">');
					productId = $('<input type="hidden" name="productId" id="productId" value="'+productDetails.id+'">');
					label1.append(starValueBox);
					label1.append(productId);
					label1.append(ratingStarSpan);
					label1.append(ratingStarSpan);
				
				label2 = $('<label for="comments"><span>Comments</span><textarea name="comments" id="comments" placeholder="Your comments"cols="5" rows="6" scale="no"></textarea></label>');
				fielset.append(label1);
				fielset.append(label2);
				frm.append(fielset);

				postreviewbutton = $('<div class="postreviewbutton"><input type="submit" value="submit" class="buttonstyle"/></div>');
				frm.append(postreviewbutton);
				
				if(api.loginresponse){
					if(api.loginresponse.userId === undefined){
						tabtext.append(loginAlertForm);
					}else{
						tabtext.append(frm);
					}
				}	

				tabwrapper.append(tab1);
				tabwrapper.append(tab2);
				tabwrapper.append(clear);
				tabwrapper.append(tabactive);
				tabwrapper.append(tabtext);
				productdetail_info.append(review); 
				productdetail_info.append(prdprice); 
				productdetail_info.append(stockavailablity); 
				productContainer.append(productname);
				productContainer.append(productimageholder);
				productContainer.append(productdetail_info);
				productContainer.append(desc);
				productContainer.append(tabwrapper);
			});  

			mainContent.append(topH3);  
			mainContent.append(productContainer);
			
			output2 = mainContent;

			equal(output1.html(), output2.html(), "Test Product details with different ProductID - Test case passed "); 
		}, 1500);
	});
});
	
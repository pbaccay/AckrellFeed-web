/* eslint-disable */
<template>
<div v-if="approved.length > 3">

<div class="md-layout">
	<div class="md-layout-item md-size-50" id="create-post">
					<div class="md-layout" v-if="showPublishNewsletter == false">
							<md-button  class="md-success md-block" @click="showPublishNewsletter = true"><md-icon>library_books</md-icon>Publish Newsletter</md-button>
					</div>
		<div v-if="showPublishNewsletter">
			<md-field>
			<label id="newsletter-edit-label">Newsletter Email subject title (required)</label>
			<md-input v-model="emailsubject"></md-input>
				<span class="md-helper-text">Title for news post</span>
			</md-field>
			<md-field>
			<label id="newsletter-edit-label">Email list (required)</label>
			<md-input v-model="emaillist"></md-input>
				<span class="md-helper-text" id="newsletter-helper-text">comma seperated list of email reciepients</span>
			</md-field>


			<div class="demo-block demo-box demo-component-docs demo-buttons.html">


				<div class="meta"  :style=showOptionalLetterStyle()> 
					<div class="highlight" style="width: 100%;">
						<md-field>
						<label id="newsletter-edit-label">Email List File (optional)</label>
						<md-input v-model="feedimgurl"></md-input>
						<span class="md-helper-text">Upload Email List</span>
						</md-field>							
					</div>
				</div> 				
				
				<div v-if="showOptional == false" class="demo-block-control" style="left: 0px;" @click="showOptional = true">
					<i class="el-icon-caret-bottom"></i> 
					<span class="showText" > Show Optional fields</span>
				</div>
				<div v-if="showOptional == true" class="demo-block-control" style="left: 0px;" @click="showOptional = false">
					<i class="el-icon-caret-top"></i> 
					<span class="showText" > Hide Optional fields</span>
				</div>				
			</div>			
				<div class="md-layout">
				    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33">
						<md-button class="md-success md-block" @click="showPublishNewsletter = false"> Cancel </md-button>
					</div>
					<div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33">
						<md-button class="md-success md-block" @click="publishNewsletter()"> Ok </md-button>
					</div>
				</div>
		</div>
	</div>
</div>
	<center class="wrapper main-template" data-link-color="#7ED321" data-body-style="font-size: 15px; color: #626262; background-color: #ffffff;">
		  <div class="webkit">
			<table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#ffffff">
				  <!--Container begin tags start-->   
				<tbody>
					<tr>
						<td valign="top" bgcolor="#ffffff" width="100%">
							<table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
								<tbody>
									<tr>
										<td width="100%">
											<table width="100%" cellpadding="0" cellspacing="0" border="0">
											  <tbody>
													<tr>
														<td v-html="rawhtml1" :key="isDataLoaded">

														</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
		  </div>
	</center>
						
						
</div>
 <div class="full-height inner" v-else>
    <div class="jumbotron">
        <h2>Newsletter preview</h2>
        <p>Please approve 4 news posts to generate preview</p>
    </div>
</div>
</template>

<script>

  import { common } from '../utils';
  import { axios } from '../utils';
import axiosmodule from 'axios';
  export default {
    props: {  
	newsitems: { default: [] },
	twittericon: {
      type: String,
      default: require("@/assets/images/Twitter_Social_Icon_Circle_Color.png")
    },
	linkedinicon: {
      type: String,
      default: require("@/assets/images/Linkedin_Social_Icon_Circle_Color.png")
    },
	rssicon: {
      type: String,
      default: require("@/assets/images/Rss_Social_Icon_Circle_Color.png")
    },
	facebookicon: {
      type: String,
      default: require("@/assets/images/Facebook_Social_Icon_Circle_Color.png")
    },
    featured: {
      type: String,
      default: "http://159.203.196.180:3000/images/featured.jpg"
    },
    newsletterheader: {
      type: String,
      default: "http://159.203.196.180:3000/images/newsletter_header.png"
    }
	
	},
    mounted() {
		this.getPendingEmailid();
		getEmailHtml: {
			var today = new Date();
			var weekofmonth = common.getMonthWeek(today);
			document.getElementById("weekofspan").innerHTML=weekofmonth;
			document.getElementById("emailwebversion").href= "http://159.203.196.180:3000/newsletter/?version=" + this.pendingEmailID;
			document.getElementById("featuredbannerlink").href=this.newsitems[0].link;
			document.getElementById("featuredtitlespan").innerHTML=this.newsitems[0].title;
			document.getElementById("featuredsummaryspan").innerHTML=this.newsitems[0].description_text;
			document.getElementById("featuredbuttonlink").href=this.newsitems[0].link;
			if(this.newsitems[1].images && this.newsitems[1].images.length > 0)
				document.getElementById("story2img").src=this.newsitems[1].images[0];	
			else 
				document.getElementById("story2img").src="http://img04.en25.com/EloquaImages/clients/AnneHollandVenturesInc/%7B057c0e78-beb4-4588-8a94-13ba9c70aedb%7D_nl-thumb-election-bug.jpg";
			document.getElementById("story2imglink").href=this.newsitems[1].link;
			document.getElementById("story2titlespan").innerHTML=this.newsitems[1].title;
			document.getElementById("story2summaryspan").innerHTML=this.newsitems[1].description_text;
			document.getElementById("story2buttonlink").href=this.newsitems[1].link;

			if(this.newsitems[2].images && this.newsitems[2].images.length > 0)
				document.getElementById("story3img").src=this.newsitems[2].images[0];	
			else 
				document.getElementById("story3img").src="http://img04.en25.com/EloquaImages/clients/AnneHollandVenturesInc/%7B057c0e78-beb4-4588-8a94-13ba9c70aedb%7D_nl-thumb-election-bug.jpg";			
			document.getElementById("story3imglink").href=this.newsitems[2].link;
			document.getElementById("story3titlespan").innerHTML=this.newsitems[2].title;
			document.getElementById("story3summaryspan").innerHTML=this.newsitems[2].description_text;
			document.getElementById("story3buttonlink").href=this.newsitems[2].link;

			if(this.newsitems[3].images && this.newsitems[3].images.length > 0)
				document.getElementById("story4img").src=this.newsitems[3].images[0];	
			else 
				document.getElementById("story4img").src="http://img04.en25.com/EloquaImages/clients/AnneHollandVenturesInc/%7B057c0e78-beb4-4588-8a94-13ba9c70aedb%7D_nl-thumb-election-bug.jpg";			
			document.getElementById("story4imglink").href=this.newsitems[3].link;
			document.getElementById("story4titlespan").innerHTML=this.newsitems[3].title;
			document.getElementById("story4summaryspan").innerHTML=this.newsitems[3].description_text;
			document.getElementById("story4buttonlink").href=this.newsitems[3].link;
			
			if(document.getElementsByClassName("main-template")[0]) {
			var emailhtml = document.getElementsByClassName("main-template")[0].outerHTML;
			this.$store.commit('UPDATE_EMAIL_TEMPLATE', emailhtml);
			}

		} 
    },

    data() {
		
		this.newsitems = this.$store.getters.approved;
        return {
            loading: false,
            editing: null,
			  emaillist: null,
			  emailsubject: null,
			  feedtitle: null,
			  feedurl: null,
			  feeddescription: null,
			  feedimgurl: null,
			  selectedPostDate: new Date(),
			  showPublishNewsletter: false,
			  sortmode: false,
			  showOptional: false,
			  isDataLoaded: false,			  
			  pendingEmailID: '',
			rawhtml1: `<!--[if mso]>
                        <center>
                        <table><tr><td width="680">
                        <![endif]-->
<!--Main Table-->
	<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:680px;" align="center">
		<tbody>
			<tr>
                <td role="modules-container" style="padding: 0px 0px 0px 0px; color: #626262; text-align: left;" bgcolor="#142540" width="100%" align="left">
<!--Container begin tags end-->   						  
<!--Pre header start-->                                        
				<table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
					<tbody>
						<tr>
							<td role="module-content">
								<p>News for the week</p>
							</td>
						</tr>
					</tbody>
				</table>
				<table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
					<tbody>
						<tr>
							<td style="padding:0px 0px 0px 0px;background-color:#f4f4f4;text-align:justify;" height="100%" valign="top" bgcolor="#f4f4f4">
								<div style="text-align: right;">
									<span style="font-size:10px;">
										<span style="font-family:verdana,geneva,sans-serif;">Email not displaying correctly? <a target="_blank" href="https://sg-mktg.com/MTU0MzYxNzQwOHxoRWNiRV9yeWJTcDgwWHV3YWNxLUJrVlFQcGhoc2JjQkw4VGtLQllkSHJCUUVvTHBpTEZzX1Fxekc3UW93LUdmYWVaQ0U4X2JnTllldVFNMld1eno4V3REcm1INFp4Nk5rRl9WOGdXUU9QU1lfUDNpNXI4MGcwZHVQalFkN3A4ZktTSi1pTG8ySGtoUFVVM0ZFdzNUTVdKSWp0NHFMUmRKREp4LXBTT2lrQ2lJNzU0dGYxZmVQZVcxaGVPSGNZdDFjQ2drWXNxVzhvc2N6LVpyTEszdW5lX0xsdUo1N3VGaFZhVTlvck9JbXJCQnJaTlcxcE1KYlB1TGF5dlFTMWc9fNILm_gm4PtPeuq__D384RncMwOBQcf7lhpKNuU9l834" id='emailwebversion'><span style="color:#0070CD;">View it</span></a> in your browser.</span>
                                    </span>
                                </div>
							</td>
						</tr>
					</tbody>
				</table>
<!--pre header end -->  
<!--Divider start -->  
    <table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
		<tbody>
			<tr>
				<td style="padding:0px 0px 0px 0px;background-color:#142540;" role="module-content" height="100%" valign="top" bgcolor="#142540">
					<table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
						<tbody>
							<tr>
								<td style="padding: 0px 0px 10px 0px;" bgcolor="#142540"></td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table>
<!--Divider end -->  
<!--Top start -->  
<table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" style="padding:0px 0px 0px 0px;background-color:#F4F4F4;" bgcolor="#F4F4F4">
      <tbody>
		<tr>
			<td height="100%" valign="top">
				<table width="680" style="width:100%;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;max-height:85px !important;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="#F4F4F4" class="yiv1012932705column yiv1012932705column-0 yiv1012932705of-2empty">
					<tbody>
						<tr>
							<td style="padding:0px;margin:0px;border-spacing:0;">
								<table class="yiv1012932705wrapper" role="module" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;">
									<tbody>
										<tr>
											<td style="font-size:6px;line-height:10px;background-color:#F4F4F4;padding:10px 20px 10px 20px;" valign="top" align="center">
												<a rel="nofollow" target="_blank" href="https://pfvglcps.r.us-west-2.awstrack.me/L0/https:%2F%2Fwww.ackrell.com/1/01010167cd48cedf-ebc893f9-c429-44a1-b212-8e2e3375e0a9-000000/nKvWmdcdg44JzCz8lmR-cgYO5kA=89"><img class="yiv1012932705max-width" width="340" src="https://ecp.yusercontent.com/mail?url=http%3A%2F%2F159.203.196.180%3A3000%2Fimages%2Fnewsletter_header.png&amp;t=1545337464&amp;ymreqid=2d302567-3e36-88e5-1cdf-010001010c00&amp;sig=o57yq93UeVDJiNmypCD.Rg--~C" alt="Ackrell Club Newsletter" border="0" style="display:block;color:#000;text-decoration:none;max-height: 86px !important;"></a>
											</td>
										</tr>
									</tbody>
								</table>
  
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
		</tbody>
	</table>
<!--Top end --> 
<!--Weekly header start--> 
    <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" data-version="2" style="padding:0px 0px 0px 0px;background-color:#142540;box-sizing:border-box;" bgcolor="#142540">
      <tbody><tr role="module-content">
        <td height="100%" valign="top">
            <!--[if (gte mso 9)|(IE)]>
              <center>
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-spacing:0;border-collapse:collapse;table-layout: fixed;" >
                  <tr>
            <![endif]-->
          
    <!--[if (gte mso 9)|(IE)]>
      <td width="340.000px" valign="top" style="padding: 0px 0px 0px 0px;border-collapse: collapse;" >
    <![endif]-->

    <table width="340.000" style="width:340.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="#142540" class="column column-0 of-2
                  empty">
      <tbody><tr>
        <td style="padding:0px;margin:0px;border-spacing:0;">
            
    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tbody><tr>
        <td style="padding:1px 0px 1px 10px;line-height:22px;text-align:inherit;" height="100%" valign="top" bgcolor="">
            <div><span style="font-family:verdana,geneva,sans-serif;"><span style="font-size:12px;"><span style="color:#FFFFFF;">Weekly Stories</span></span></span></div>
        </td>
      </tr>
    </tbody></table>
  
        </td>
      </tr>
    </tbody></table>

    <!--[if (gte mso 9)|(IE)]>
      </td>
    <![endif]-->
    <!--[if (gte mso 9)|(IE)]>
      <td width="340.000px" valign="top" style="padding: 0px 0px 0px 0px;border-collapse: collapse;" >
    <![endif]-->

    <table width="340.000" style="width:340.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="#142540" class="column column-1 of-2
                  empty">
      <tbody><tr>
        <td style="padding:0px;margin:0px;border-spacing:0;">
            
    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tbody><tr>
        <td style="padding:1px 10px 1px 0px;line-height:22px;text-align:inherit;" height="100%" valign="top" bgcolor="">
            <div style="text-align: right;"><span style="font-family:verdana,geneva,sans-serif;"><span style="font-size:12px;"><span style="color:#FFFFFF;" id="weekofspan">December 1, 2018</span></span></span></div>
        </td>
      </tr>
    </tbody></table>
  
        </td>
      </tr>
    </tbody></table>

    <!--[if (gte mso 9)|(IE)]>
      </td>
    <![endif]-->
            <!--[if (gte mso 9)|(IE)]>
                  <tr>
                </table>
              </center>
            <![endif]-->
        </td>
      </tr>
    </tbody></table>
<!--Weekly header end-->
	
</td>
</tr>
<!-- End of main module-->
<!--Featured Story Start-->	
<tr>
<td>
	<table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;background-color:#142540;max-height: 300px !important;">
		<tbody>
			<tr>
			<td style="font-size:6px;line-height:10px;padding:0px 0px 0px 0px;" valign="top" align="left">
			  <a id="featuredbannerlink" href="https://cannabislaw.report/bankers-congress-cannabis/" target="_blank"><img class="max-width" width="680" src="http://159.203.196.180:3000/images/featured.jpg" alt="" border="0" style="display:block;color:#000;text-decoration:none;font-family:Roboto,Helvetica,Arial, sans-serif;font-size:16px;max-width:100% !important;width:100%;height:auto !important; max-height: 300px !important;"></a>
			</td>
			</tr>
		</tbody>
	</table>

	<table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color:#142540; ">
		<tbody>
			<tr>
			<td style="padding:44px 34px 34px 34px;text-align:inherit;" height="100%" valign="top" bgcolor="">
				<div style="text-align: center;"><span style="color:#FFFFFF;"><span style="font-size:22px;" id="featuredtitlespan">Bankers, Congress &amp; Cannabis</span></span></div>

			<div>&nbsp;</div>

			<div style="text-align: center;"><span style="color:#FFFFFF;" id="featuredsummaryspan">Sessions has been moved on, The Democrats have the house and the finance industry is seeing others make money from the green rush. Looks like DC lobbying is about to ratchet up a notch or two</span></div>
			</td>
			</tr>
		</tbody>
	</table>
	<table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%"><tbody><tr><td align="center" bgcolor="#142540" class="outer-td" style="padding:10px 0px 20px 0px;background-color:#142540"><table border="0" cellpadding="0" cellspacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:center"><tbody><tr><td align="center" bgcolor="#ffffff" class="inner-td" style="-webkit-border-radius:7px;-moz-border-radius:7px;border-radius:7px;font-size:16px;text-align:center;background-color:inherit"><a id="featuredbuttonlink" style="background-color:#ffffff;width:200px;font-size:15px;line-height:20px;font-family:Roboto,Helvetica,Arial,sans-serif;color:#2b4141;padding:10px 5px 10px 10px;text-decoration:none;-webkit-border-radius:7px;-moz-border-radius:7px;border-radius:0px;border:1px solid #7ED321;display:inline-block;border-width:4px;border-color:#b8b8b8" href="https://cannabislaw.report/bankers-congress-cannabis/" target="_blank">Read Full Story &gt;</a></td></tr></tbody></table></td></tr></tbody></table>
</td>
</tr>
	<!--Featured Story end-->
<!-- Story 2and3 start-->
<tr>
<td>
<table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" data-version="2" style="padding:0px 0px 0px 0px;background-color:#305274;box-sizing:border-box;" bgcolor="#305274">
      <tbody><tr role="module-content">
        <td height="100%" valign="top">
            <!--[if (gte mso 9)|(IE)]>
              <center>
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-spacing:0;border-collapse:collapse;table-layout: fixed;" >
                  <tr>
            <![endif]-->
          
    <!--[if (gte mso 9)|(IE)]>
      <td width="340.000px" valign="top" style="padding: 0px 0px 0px 0px;border-collapse: collapse;" >
    <![endif]-->

    <table width="340.000" style="width:340.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="#305274" class="column column-0 of-2
                  empty">
      <tbody><tr>
        <td style="padding:0px;margin:0px;border-spacing:0;">
            
    <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tbody><tr>
        <td style="font-size:6px;line-height:10px;padding:15px 0px 10px 0px;" valign="top" align="center">
          <a id="story2imglink" href="https://cannabislaw.report/bankers-congress-cannabis/" target="_blank"><img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Roboto,Helvetica,Arial,sans-serif;font-size:16px;max-width:50% !important;width:50%;height:150px !important; max-height:150px !important; object-fit: cover;" src="https://cannabislaw.report/wp-content/uploads/2018/11/Screen-Shot-2018-11-27-at-1.10.43-PM-150x150.png" alt="" width="150" id="story2img"></a>
        </td>
      </tr>
    </tbody></table>
  
    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tbody><tr>
        <td style="padding:5px 5px 5px 5px;line-height:20px;text-align:inherit;" height="100%" valign="top" bgcolor="">
            <p style="text-align: center; color: rgb(60, 72, 88); height: 75px; text-overflow: ellipsis; padding-right: 20px; padding-top: 10px; line-height: 18px; overflow: hidden;"><span style="font-size:14px;"><span style="font-family:Roboto,Helvetica,Arial,sans-serif;"><span style="color:#FFFFFF;" id="story2titlespan">New Jersey Legislature Finally Starts Long Walk To Regulation</span></span></span></p>
        </td>
      </tr>
    </tbody></table>
  
    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tbody><tr>
        <td style="padding:05px 2px 05px 2px;line-height:20px;text-align:inherit;" height="100%" valign="top" bgcolor="">
            <div style="text-align: center;  color: rgb(60, 72, 88); height: 140px;,max-height: 140px; text-overflow: ellipsis; padding-right: 20px; padding-top: 10px;line-height: 20px; overflow: hidden; "><span style="color:#D3D3D3;"><span style="font-family: "Roboto", "Helvetica", "Arial", sans-serif; font-size: 12px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; white-space: pre-wrap;" id="story2summaryspan">Bloomberg write, "The cannabis sector has seen 27 major deals worth US$10.6 billion announced this year, according to data compiled by Bloomberg. Add in 127 stock sales worth US$2.65 billion, and advice to clients on how to navigate a complex new regulatory environment, and it’s been a boon for Toronto’s biggest law firms, many of whom had regarded it with trepidation for years."</span></span></div>
        </td>
      </tr>
    </tbody></table>
  <table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%"><tbody><tr><td align="center" class="outer-td" style="padding:10px 0px 20px 0px"><table border="0" cellpadding="0" cellspacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:center"><tbody><tr><td align="center" bgcolor="#ffffff" class="inner-td" style="-webkit-border-radius:7px;-moz-border-radius:7px;border-radius:7px;font-size:15px;text-align:center;background-color:inherit"><a style="background-color:#ffffff;width:200px;font-size:15px;line-height:20px;font-family:Roboto,Helvetica,Arial,sans-serif;color:#2b4141;padding:10px 5px 10px 10px;text-decoration:none;-webkit-border-radius:7px;-moz-border-radius:7px;border-radius:0px;border:1px solid #7ED321;display:inline-block;border-width:4px;border-color:#b8b8b8" href="https://cannabislaw.report/bloomberg-profile-canadian-law-firms-with-cannabis-practices-in-article-entitled-pot-is-becoming-an-earner-for-once-reluctant-toronto-law-firms/" target="_blank" id="story2buttonlink">Read Full Story &gt;</a></td></tr></tbody></table></td></tr></tbody></table>
        </td>
      </tr>
    </tbody></table>

    <!--[if (gte mso 9)|(IE)]>
      </td>
    <![endif]-->
    <!--[if (gte mso 9)|(IE)]>
      <td width="340.000px" valign="top" style="padding: 0px 0px 0px 0px;border-collapse: collapse;" >
    <![endif]-->

    <table width="340.000" style="width:340.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="#305274" class="column column-1 of-2
                  empty">
      <tbody><tr>
        <td style="padding:0px;margin:0px;border-spacing:0;">
            
    <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tbody><tr>
        <td style="font-size:6px;line-height:10px;padding:15px 0px 10px 0px;" valign="top" align="center">
          <a id="story3imglink" href="https://cannabislaw.report/bankers-congress-cannabis/" target="_blank"><img id="story3img" class="max-width" width="170" src="https://cannabislaw.report/wp-content/uploads/2018/11/images-38-150x150.jpeg" alt="" border="0" style="display:block;color:#000;text-decoration:none;font-family:Roboto,Helvetica,Arial,sans-serif;font-size:16px;max-width:50% !important;width:50%;height:150px !important; max-height:150px !important; object-fit: cover;" alt="" width="150" ></a>
        </td>
      </tr>
    </tbody></table>
  
    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tbody><tr>
        <td style="padding:5px 5px 5px 5px;line-height:20px;text-align:inherit;" height="100%" valign="top" bgcolor="">
            <p style="text-align: center; color: rgb(60, 72, 88); height: 75px; text-overflow: ellipsis; padding-right: 20px; padding-top: 10px; line-height: 18px; overflow: hidden;"><span style="font-size:14px;"><span style="font-family:Roboto,Helvetica,Arial,sans-serif;"><span style="color:#FFFFFF;" id="story3titlespan">South Korea Revises South Korea’s Act on the Management of Narcotic Drugs</span></span></span></p>
        </td>
      </tr>
    </tbody></table>
  
    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tbody><tr>
        <td style="padding:05px 2px 05px 2px;line-height:20px;text-align:inherit;" height="100%" valign="top" bgcolor="">
            <div style="text-align: center;  color: rgb(60, 72, 88); height: 140px;,max-height: 140px; text-overflow: ellipsis; padding-right: 20px; padding-top: 10px;line-height: 20px; overflow: hidden; "><span style="color:#D3D3D3;"><span style="font-family: "Roboto", "Helvetica", "Arial", sans-serif; font-size: 12px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; white-space: pre-wrap;" id="story3summaryspan">Bloomberg write, "The cannabis sector has seen 27 major deals worth US$10.6 billion announced this year, according to data compiled by Bloomberg. Add in 127 stock sales worth US$2.65 billion, and advice to clients on how to navigate a complex new regulatory environment, and it’s been a boon for Toronto’s biggest law firms, many of whom had regarded it with trepidation for years."</span></span></div>
        </td>
      </tr>
    </tbody></table>
  <table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%"><tbody><tr><td align="center" class="outer-td" style="padding:10px 0px 20px 0px"><table border="0" cellpadding="0" cellspacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:center"><tbody><tr><td align="center" bgcolor="#ffffff" class="inner-td" style="-webkit-border-radius:7px;-moz-border-radius:7px;border-radius:7px;font-size:16px;text-align:center;background-color:inherit"><a style="background-color:#ffffff;width:200px;font-size:15px;line-height:20px;font-family:Roboto,Helvetica,Arial,sans-serif;color:#2b4141;padding:10px 5px 10px 10px;text-decoration:none;-webkit-border-radius:7px;-moz-border-radius:7px;border-radius:0px;border:1px solid #7ED321;display:inline-block;border-width:4px;border-color:#b8b8b8" href="https://cannabislaw.report/if-you-werent-taking-tsa-warnings-seriously-before-now-you-will-be/" target="_blank" id="story3buttonlink">Read Full Story &gt;</a></td></tr></tbody></table></td></tr></tbody></table>
        </td>
      </tr>
    </tbody></table>

    <!--[if (gte mso 9)|(IE)]>
      </td>
    <![endif]-->
            <!--[if (gte mso 9)|(IE)]>
                  <tr>
                </table>
              </center>
            <![endif]-->
        </td>
      </tr>
    </tbody></table>
</td>
</tr>
<!-- Story 2and3 end-->	
<!--In the News start-->
<tr>
<td>
<table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tbody><tr>
        <td style="background-color:#ffffff;padding:2px 0px 2px 0px;line-height:22px;text-align:inherit;" height="100%" valign="top" bgcolor="#ffffff">
            <h3 style="text-align: center;"><strong>In the News</strong></h3>

        </td>
      </tr>
    </tbody></table>
</td>
</tr>
<!--In the News end-->	
<!--Story 4 start-->
<tr>
<td>
<table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" data-version="2" style="padding:0px 0px 0px 0px;background-color:#ffffff;box-sizing:border-box;" bgcolor="#ffffff">
      <tbody><tr role="module-content">
        <td height="100%" valign="top">
            <!--[if (gte mso 9)|(IE)]>
              <center>
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-spacing:0;border-collapse:collapse;table-layout: fixed;" >
                  <tr>
            <![endif]-->
          
    <!--[if (gte mso 9)|(IE)]>
      <td width="340.000px" valign="top" style="padding: 0px 0px 0px 0px;border-collapse: collapse;" >
    <![endif]-->

    <table width="340.000" style="width:340.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="#ffffff" class="column column-0 of-2
                  empty">
      <tbody><tr>
        <td style="padding:0px;margin:0px;border-spacing:0;">
            
    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tbody><tr>
        <td style="padding:5px 5px 5px 5px;line-height:20px;text-align:inherit;" height="100%" valign="top" bgcolor="">
            <p style="text-align: center; color: rgb(60, 72, 88); height: 60px; text-overflow: ellipsis; padding-right: 20px; padding-top: 10px; line-height: 20px; overflow: hidden;"><span style="font-size:14px;"><span style="font-family:Roboto,Helvetica,Arial,sans-serif;" id="story4titlespan">If You Weren’t Taking TSA Warnings Seriously Before, Now You Will Be</span></span></p>

        </td>
      </tr>
    </tbody></table>
  
    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tbody><tr>
        <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;" height="100%" valign="top" bgcolor="">
            <div><span style="font-family:Roboto,Helvetica,Arial,sans-serif; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400;" id="story4summaryspan">The Senate’s Social Affairs Committee signed off on the legislation, but before&nbsp;the full Senate gets to vote, it will also have to pass in the Commission on Constitution and Justice. Then, if the Senate does approve the bill, it must be reviewed by the&nbsp;Chamber of Deputies.</span></div>

        </td>
      </tr>
    </tbody></table>
  
        </td>
      </tr>
    </tbody></table>

    <!--[if (gte mso 9)|(IE)]>
      </td>
    <![endif]-->
    <!--[if (gte mso 9)|(IE)]>
      <td width="340.000px" valign="top" style="padding: 0px 0px 0px 0px;border-collapse: collapse;" >
    <![endif]-->

    <table width="340.000" style="width:340.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="#ffffff" class="column column-1 of-2
                  empty">
      <tbody><tr>
        <td style="padding:0px;margin:0px;border-spacing:0;">
            
    <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tbody><tr>
        <td style="font-size:6px;line-height:10px;padding:0px 0px 0px 0px;" valign="top" align="center">
          <a id="story4imglink" href="https://cannabislaw.report/bankers-congress-cannabis/" target="_blank"><img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Roboto,Helvetica,Arial,sans-serif;font-size:16px;padding-top:10px;max-width:75% !important;width:75%;height:auto !important; object-fit: cover;" width="255" src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iStUcRp_beBA/v2/685x-1.png" alt="" id="story4img"></a>
        </td>
      </tr>
    </tbody></table>
  <table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%"><tbody><tr><td align="center" bgcolor="" class="outer-td" style="padding:10px 0px 20px 0px"><table border="0" cellpadding="0" cellspacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:center"><tbody><tr><td align="center" bgcolor="#ffffff" class="inner-td" style="-webkit-border-radius:7px;-moz-border-radius:7px;border-radius:7px;font-size:15px;text-align:center;background-color:inherit"><a style="background-color:#ffffff;width:200px;font-size:16px;line-height:20px;font-family:Roboto,Helvetica,Arial,sans-serif;color:#2b4141;padding:10px 5px 10px 10px;text-decoration:none;-webkit-border-radius:7px;-moz-border-radius:7px;border-radius:0px;border:1px solid #7ED321;display:inline-block;border-width:4px;border-color:#b8b8b8" href="" target="_blank" id="story4buttonlink">Read Full Story &gt;</a></td></tr></tbody></table></td></tr></tbody></table>
        </td>
      </tr>
    </tbody></table>

    <!--[if (gte mso 9)|(IE)]>
      </td>
    <![endif]-->
            <!--[if (gte mso 9)|(IE)]>
                  <tr>
                </table>
              </center>
            <![endif]-->
        </td>
      </tr>
    </tbody></table>
</td>
</tr>	
<!-- Story 4 end-->



<!-- Footer 5 start-->
<tr><td align="center" valign="top" bgcolor="#f1f2f2" style="background-color: rgb(241, 242, 242);">
<table width="100%" cellpadding="0" border="0" cellspacing="0" bgcolor="#f1f2f2" name="Layout_4" id="Layout_4" class="rnb-del-min-width rnb-tmpl-width" style="background-color: rgb(241, 242, 242);">
<tbody><tr>
<td align="center" valign="top" bgcolor="#f1f2f2" class="rnb-del-min-width" style="background-color: rgb(241, 242, 242);">
<table cellpadding="0" border="0" align="center" cellspacing="0" class="rnb-container rnb-yahoo-width" style="padding-right: 20px; padding-left: 20px;">
<tbody><tr><td height="20" style="font-size: 1px; line-height: 1px;"></td></tr><tr><td style="font-size: 14px; color: rgb(136, 136, 136); font-weight: normal; text-align: center; font-family:Roboto,Helvetica,Arial,sans-serif;"><div>Ackrell Capital © 2018, All Rights Reserved.</div></td></tr><tr><td height="20" style="font-size: 1px; line-height: 1px;"></td></tr></tbody></table></td></tr></tbody></table></td></tr>
<!-- Footer  end-->
</tbody>
</table>`
        }
    },
    components: { },
    computed: {
approved() {

            return this.$store.getters.approved;
          },
featuredTitledText() {
	return this.newsitems.indexOf[0].title;
}
    },
    methods: {
		getStoryImg(index, item) {
	if(index == 1){
		if(item.images && item.images.length > 0) {
			return item.images[0];
			} else {
				return "http://img04.en25.com/EloquaImages/clients/AnneHollandVenturesInc/%7B057c0e78-beb4-4588-8a94-13ba9c70aedb%7D_nl-thumb-election-bug.jpg" ;
				}
		} 	else if(index == 2){
		if(item.images && item.images.length > 0) {
			return item.images[0];
			} else {
				return "http://img04.en25.com/EloquaImages/clients/AnneHollandVenturesInc/%7B057c0e78-beb4-4588-8a94-13ba9c70aedb%7D_nl-thumb-election-bug.jpg" ;
				}
		}else {
						return "http://img04.en25.com/EloquaImages/clients/AnneHollandVenturesInc/%7B057c0e78-beb4-4588-8a94-13ba9c70aedb%7D_nl-thumb-election-bug.jpg" ;
			}
	},
        updatedTime(time) {
            return common.timeAgo(time);
        },	
	getPendingEmailid() {
				var self = this;
		axios.get( 'pendingwebemail' ).then(res => {
			let result = res.data;
			if(result && result.emailid) {
				console.log("PBK pendingwebemail success: " + result.emailid);
				self.pendingEmailID = result.emailid;
				//self.updateEmailHtml();
				//self.isDataLoaded = true;
				document.getElementById("emailwebversion").href= "http://159.203.196.180:3000/user/newsletter/?version=" + result.emailid;
							if(document.getElementsByClassName("main-template")[0]) {
			var emailhtml = document.getElementsByClassName("main-template")[0].outerHTML;
			this.$store.commit('UPDATE_EMAIL_TEMPLATE', emailhtml);
			}
				this.updatePendingNewsletter(emailhtml, result.emailid, );
			}
	  })	
	},	
	publishNewsletter() {
			var emailhtmlstore = this.$store.getters.getEmailHtml;
			var emailid = this.pendingEmailID;
			var  emails = this.emaillist.split(',');
			this.showPublishNewsletter = false;
			axios.post('publishNewsletter', {
			  subject: this.emailsubject,
			  emaillist: emails,
			  emailid: emailid,
			  postedDate: new Date(),
			  html: emailhtmlstore
			}).then(res => {
							let result = res.data;
			if(result && result.emailid) {
				console.log("PBK publishNewsletter success: " + result.emailid);
				self.pendingEmailID = result.emailid;
				document.getElementById("emailwebversion").href= "http://159.203.196.180:3000/user/newsletter/?version=" + result.emailid;
							if(document.getElementsByClassName("main-template")[0]) {
			var emailhtml = document.getElementsByClassName("main-template")[0].outerHTML;
			this.$store.commit('UPDATE_EMAIL_TEMPLATE', emailhtml);
			}
				this.updatePendingNewsletter(emailhtml, result.emailid, );
			}
			});
					
	},
	updatePendingNewsletter(emailhtml, emailpendingid) {
			var emailhtmlstore = emailhtml;
						var today = new Date();
			var weekofmonth = common.getMonthWeek(today);
			var emaildata = {};
			emaildata['subject'] = 'Newsletter: '+ weekofmonth;
			emaildata['emailid'] = emailpendingid;
			emaildata['html'] = emailhtmlstore;
			axios.post('updatependingwebemail', {
			  emaildata
			})
					
	},
	showOptionalLetterStyle() {
					if(this.showOptional) {
						return "display: block;";
					  }	else {
						return "display: none;";
					  }	
	},
			updateEmailHtml() {
			var today = new Date();
			var weekofmonth = common.getMonthWeek(today);
			document.getElementById("weekofspan").innerHTML=weekofmonth;
			document.getElementById("emailwebversion").href= "http://159.203.196.180:3000/user/newsletter/?version=" + this.pendingEmailID;
			document.getElementById("featuredbannerlink").href=this.newsitems[0].link;
			document.getElementById("featuredtitlespan").innerHTML=this.newsitems[0].title;
			document.getElementById("featuredsummaryspan").innerHTML=this.newsitems[0].description_text;
			document.getElementById("featuredbuttonlink").href=this.newsitems[0].link;
			if(this.newsitems[1].images && this.newsitems[1].images.length > 0)
				document.getElementById("story2img").src=this.newsitems[1].images[0];	
			else 
				document.getElementById("story2img").src="http://img04.en25.com/EloquaImages/clients/AnneHollandVenturesInc/%7B057c0e78-beb4-4588-8a94-13ba9c70aedb%7D_nl-thumb-election-bug.jpg";
			document.getElementById("story2imglink").href=this.newsitems[1].link;
			document.getElementById("story2titlespan").innerHTML=this.newsitems[1].title;
			document.getElementById("story2summaryspan").innerHTML=this.newsitems[1].description_text;
			document.getElementById("story2buttonlink").href=this.newsitems[1].link;

			if(this.newsitems[2].images && this.newsitems[2].images.length > 0)
				document.getElementById("story3img").src=this.newsitems[2].images[0];	
			else 
				document.getElementById("story3img").src="http://img04.en25.com/EloquaImages/clients/AnneHollandVenturesInc/%7B057c0e78-beb4-4588-8a94-13ba9c70aedb%7D_nl-thumb-election-bug.jpg";			
			document.getElementById("story3imglink").href=this.newsitems[2].link;
			document.getElementById("story3titlespan").innerHTML=this.newsitems[2].title;
			document.getElementById("story3summaryspan").innerHTML=this.newsitems[2].description_text;
			document.getElementById("story3buttonlink").href=this.newsitems[2].link;

			if(this.newsitems[3].images && this.newsitems[3].images.length > 0)
				document.getElementById("story4img").src=this.newsitems[3].images[0];	
			else 
				document.getElementById("story4img").src="http://img04.en25.com/EloquaImages/clients/AnneHollandVenturesInc/%7B057c0e78-beb4-4588-8a94-13ba9c70aedb%7D_nl-thumb-election-bug.jpg";			
			document.getElementById("story4imglink").href=this.newsitems[3].link;
			document.getElementById("story4titlespan").innerHTML=this.newsitems[3].title;
			document.getElementById("story4summaryspan").innerHTML=this.newsitems[3].description_text;
			document.getElementById("story4buttonlink").href=this.newsitems[3].link;
			
			if(document.getElementsByClassName("main-template")[0]) {
			var emailhtml = document.getElementsByClassName("main-template")[0].outerHTML;
			this.$store.commit('UPDATE_EMAIL_TEMPLATE', emailhtml);
			}

		} 
    },		
    watch: {
        '$route' (to) {
        }
    }
}
</script>
	
<style lang="css">
#newsletter-edit-label {
	font-size: 18px;
}
#newsletter-helper-text {
	font-size: 15px;
}
      img.max-width {
        max-width: 100% !important;
      }
      .column.of-2 {
        width: 50%;
      }
      .column.of-3 {
        width: 33.333%;
      }
      .column.of-4 {
        width: 25%;
      }
      @media screen and (max-width:480px) {
        .preheader .rightColumnContent,
        .footer .rightColumnContent {
            text-align: left !important;
        }
        .preheader .rightColumnContent div,
        .preheader .rightColumnContent span,
        .footer .rightColumnContent div,
        .footer .rightColumnContent span {
          text-align: left !important;
        }
        .preheader .rightColumnContent,
        .preheader .leftColumnContent {
          font-size: 80% !important;
          padding: 5px 0;
        }
        table.wrapper-mobile {
          width: 100% !important;
          table-layout: fixed;
        }
        img.max-width {
          height: auto !important;
          max-width: 480px !important;
        }
        a.bulletproof-button {
          display: block !important;
          width: auto !important;
          font-size: 80%;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .columns {
          width: 100% !important;
        }
        .column {
          display: block !important;
          width: 100% !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
		#create-post {

    border: 1px solid #bbbbbb;
    border-radius: 3px;
    -webkit-transition: .2s;
    transition: .2s;
}

.demo-block {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    -webkit-transition: .2s;
    transition: .2s;
}

.demo-block .demo-block-control {
    border-top: 1px solid #eaeefb;
    height: 44px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #39454b;
    cursor: pointer;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

demo-block .source {
    padding: 24px;
}

demo-block .meta {
    background-color: #fafafa;
    border-top: 1px solid #eaeefb;
    height: 0;
    -webkit-transition: height .2s;
    transition: height .2s;
    overflow: scroll;
}
      }
</style>

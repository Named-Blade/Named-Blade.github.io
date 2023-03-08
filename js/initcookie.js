window.addEventListener('load', function(){
	var dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack || navigator.globalPrivacyControl;
	if (dnt != "1" && dnt != "yes"){
		document.body.classList.toggle('c_darkmode');

		var cc = initCookieConsent();

		cc.run({
			current_lang: 'en',
			autoclear_cookies: true,
			page_scripts: true,
			cookie_expiration: 7,
			
			onFirstAction: function(user_preferences, cookie){
			},

			onAccept: function (cookie) {
				console.log(cookie);
			},

			onChange: function (cookie, changed_categories) {
				console.log(cookie);
			},

			languages: {
				'en': {
					consent_modal: {
						title: '<img src=images/Big_Google.png style ="width:100px;" />',
						description: 'This website uses cookies to track usage statistics.',
						primary_btn: {
							text: 'Accept',
							role: 'accept_all'
						},
						secondary_btn: {
							text: 'Decline',
							role: 'accept_necessary'
						}
					},
					settings_modal: {
						title: 'Cookie preferences',
						save_settings_btn: 'Save settings',
						accept_all_btn: 'Accept all',
						reject_all_btn: 'Reject all',
						close_btn_label: 'Close',
						cookie_table_headers: [
							{col1: 'Name'},
							{col2: 'Domain'},
							{col3: 'Expiration'},
							{col4: 'Description'}
						],
						blocks: [
							{
								title: 'Performance and Analytics cookies',
								description: 'These cookies allow the website to remember the choices you have made in the past',
								toggle: {
									value: 'analytics',
									enabled: false,
									readonly: false
								},
								cookie_table: [
									{
										col1: '^_ga',
										col2: 'google.com',
										col3: '2 years',
										col4: 'description ...',
										is_regex: true
									},
									{
										col1: '_gid',
										col2: 'google.com',
										col3: '1 day',
										col4: 'description ...',
									}
								]
							}
						]
					}
				}
			},
			
			 gui_options: {
				consent_modal: {
					layout: 'bar',
					position: 'top center',
					transition: 'slide'
				},
				settings_modal: {
					layout: 'box',
					// position: 'left',
					transition: 'slide'
				}
			}
		});
	}
});
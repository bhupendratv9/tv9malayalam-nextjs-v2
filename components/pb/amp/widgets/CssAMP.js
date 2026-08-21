export const ampCss = `
:root{--body-bg:#fff;--adcont-bg:#f9f9f9;--header-bg:#fff;--header-bdr:#fff;--primary-text:#000;--color-red:#e85a00;--color-white:#fff;--border-color:#dfdfdf;--webstory-widget-bg:#1f222b;--videogal-widget-bg:#003e7b;--photogal-widget-bg:#e85a00;--phototxt-bg:#733006;--trending-widget-txt-bg:#240006;--footer-bg:#000;--twitter-bg:#000;--facebook-bg:#385997;--social-feed-bg:#f5e4d5;--latestnews-txtwidget-bg:#dfdfdf;--latestvideos-txtwidget-bg:#003e7b;--cat-bignews-bg:#fff4ed;--common-btn-bg:#f6d8be;--scrolltop-bg:#000;--story-bdr-color:#fff;--alsoread-widget-bg:#fde6d2;--alsoread-thumbs-bg:#fff0e3;--tags-bg:#ffe2c8;--photocard-bg:#fde6d2;--photocard-bdr:#dbc8b8}
*,:after,:before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:0;margin:0;outline:0}
body{font-family:"Noto Sans",sans-serif;color:var(--primary-text);font-size:1.125rem;background:var(--body-bg);-webkit-text-size-adjust:none}
amp-img{max-width:100%;height:inherit}
ul{list-style:none}
.imgwrap{position:relative;height:fit-content}
a{text-decoration:none;color:var(--primary-text)}
.adsCont{text-align:center;clear:both;margin:0 -.9375rem 1.875rem -.9375rem;position:relative;min-height:300px;padding-top:.63rem;z-index:0;background:var(--adcont-bg)}
.adsCont:before{content:"विज्ञापन";font-size:.75rem;font-weight:400;display:block;color:var(--primary-text);text-transform:uppercase;margin-bottom:.31rem;line-height:1}
.container{width:100%;max-width:600px;margin:0 auto;padding:0 .9375rem}
.common_heading{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;margin-bottom:.625rem}
.common_heading .h2,.common_heading .h2 a{color:var(--primary-text);font-size:1.875rem;font-weight:800;text-transform:capitalize;position:relative}
.common_heading .h2 a::after{content:"";border:solid var(--color-red);border-width:0 2px 2px 0;border-radius:2px;display:inline-block;padding:3px;transform:rotate(-45deg);-webkit-transform:rotate(-45deg);margin-left:5px;vertical-align:middle}
@keyframes pulse-red{
0%{transform:scale(.95);box-shadow:0 0 0 0 rgba(176,0,32,.7)}
70%{transform:scale(1);box-shadow:0 0 0 10px rgba(176,0,32,0)}
100%{transform:scale(.95);box-shadow:0 0 0 0 rgba(176,0,32,0)}
}
@keyframes pulse-white{
0%{transform:scale(.95);box-shadow:0 0 0 0 rgba(255,255,255,.7)}
70%{transform:scale(1);box-shadow:0 0 0 10px rgba(176,0,32,0)}
100%{transform:scale(.95);box-shadow:0 0 0 0 rgba(176,0,32,0)}
}
.breadcrumb{margin-bottom:1.25rem}
.breadcrumb span{position:relative;font-weight:400;font-size:.875rem;text-transform:capitalize}
.breadcrumb span a{color:var(--primary-text);text-decoration:underline}
.breadcrumb span::after{content:"/";display:inline-block;margin:0 3px 0 10px;color:#c1ac9b}
.breadcrumb span:last-child:after{display:none}
.common_border{margin:0 0 1.875rem 0;background:var(--border-color);width:auto;height:.3125rem}
.icon_Comn{width:1.875rem;height:1.5625rem;background:var(--color-red);position:absolute;bottom:0;left:0;display:flex;justify-content:center;align-items:center}
.icon_Comn svg{width:1.125rem;height:1.125rem;fill:transparent;stroke:#fff}
.main_header{width:100%;height:3.9375rem;border-bottom:1px solid var(--header-bdr);margin:0 auto;position:fixed;top:0;background:var(--header-bg);z-index:9}
.topheadersticky{margin-top:4.6875rem}
.main_header .container{display:flex;align-items:center;justify-content:space-between;height:3.9375rem}
.logo_wrap amp-img{width:52px;height:46px;display:block}
.rhsNav_Menu{display:flex;align-items:center}
#toggleNav{display:flex;align-items:center}
.MenuBtn{cursor:pointer}
.MenuBtn i{width:23px;height:2px;display:block;background:var(--primary-text);margin-bottom:3px;border-radius:2px}
.MenuBtn i:nth-child(4){padding-top:0}
.MenuBtn i:nth-child(even){width:17px}
.megaMenu_Header{padding:.9375rem 0;display:flex;justify-content:space-between;border-bottom:1px solid #bca796}
.megaMenu_Header .navHead{font-size:1.25rem;font-weight:700;text-transform:uppercase}
.close_icon{width:24px;height:24px;display:block;cursor:pointer}
.menuNavigation{color:var(--primary-text);background:var(--header-bg);width:100%}
.menuNavigation .listItems section{border-bottom:1px solid var(--header-bdr);padding:.625rem 0}
.menuNavigation .listItems section h4{width:100%;text-align:left;margin:0;border:none;position:relative;cursor:pointer;line-height:35px;background:0 0}
.menuNavigation .listItems section h4 a.catHead{font-weight:600;font-size:1.125rem;color:#000}
.menuNavigation .subItems li{list-style:none}
.menuNavigation .subItems li a{text-decoration:none;color:#000;font-size:.9375rem}
.menuNavigation .subItems{display:block;padding-left:20px}
.menuNavigation .listItems section h4 span{border:solid #000;border-width:0 1px 1px 0;display:inline-block;padding:4px;transform:rotate(-45deg);-webkit-transform:rotate(-45deg);position:absolute;right:10px;top:18px}
.menuNavigation .listItems section[expanded] h4 span{transform:rotate(45deg);-webkit-transform:rotate(45deg);top:14px}
.articleHD{color:var(--primary-text);font-size:2.375rem;line-height:3.125rem;font-weight:700;margin-bottom:1.25rem}
.articleBody h2,.articleBody h3,.articleBody h4{margin-bottom:.625rem;font-size:1.375rem;line-height:1.875rem;font-weight:600}
.excerpt{margin-bottom:1.25rem}
.excerpt h2{margin-bottom:0;color:var(--primary-text);font-size:1.125rem;font-weight:400;line-height:1.625rem}
.featured_image{position:relative;margin-bottom:1rem}
.featured_image amp-img{display:block;width:100%;aspect-ratio:16/9}
.featured_image::after{content:"";width:98%;height:98%;border:2px solid var(--color-red);background:var(--body-bg);position:absolute;left:-.38rem;bottom:-.38rem;z-index:-1}
.image_caption{padding-bottom:.62rem;color:var(--primary-text);font-size:.875rem;font-weight:400;margin-bottom:1.25rem;border-bottom:1px solid var(--border-color);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap}
.articleBody p{color:var(--primary-text);font-size:1.25rem;font-weight:400;margin-bottom:1.875rem;line-height:1.875rem}
.articleBody a{color:var(--color-red)}
.articleBody ul{padding-left:20px}
.articleBody ul li{color:var(--primary-text);font-size:1.125rem;font-weight:400;margin-bottom:1rem}
.articleBody ul li{list-style-type:disc}
.article_author{display:flex;justify-content:space-between;margin:0 0 10px 0}
.article_author .AuthorInfo figure{display:flex;justify-content:flex-start;align-items:center;flex-wrap:wrap}
.article_author .coauthors_list{display:flex;justify-content:flex-start;align-items:center}
.article_author .AuthorInfo .authorThumb amp-img{width:1.875rem;height:1.875rem;border-radius:1.875rem;border:1px solid #ebbc0e;background:#fff;display:block;margin-right:.625rem;object-fit:cover}
.article_author .AuthorInfo .authorThumb a{display:flex;align-items:center}
.article_author .AuthorInfo .coauthors_list a{color:var(--secondary-text);text-transform:capitalize}
.article_author .AuthorInfo .coauthors_list span{color:var(--primary-text);font-weight:600;margin-right:.38rem;padding-right:.38rem;position:relative;font-size:.875rem}
.article_author .AuthorInfo .coauthors_list span::after{border-right:solid 1px var(--primary-text);content:"";position:absolute;right:-1px;height:10px;top:5px}
.article_author .AuthorInfo figcaption{font-size:.875rem;font-weight:400;text-transform:capitalize;color:var(--primary-text)}
.article_author .AuthorInfo figcaption span.label:nth-of-type(2){margin-left:.38rem}
amp-social-share{border-radius:50px;background-size:100%;width:90px}
amp-social-share[type=system]{background-image:url(https://images.tv9hindi.com/images/share_icon_amp.svg);background-repeat:no-repeat;background-position:center;outline:0;margin-left:.5rem}
.article_socialShare{display:flex;justify-content:flex-start;align-items:center;margin-bottom:1rem}
.article_socialShare a{margin:0 .94rem 0 0;width:1.75rem;height:1.75rem;display:flex;border-radius:100%;align-items:center;justify-content:center}
.article_socialShare a:last-child{margin-right:0}
.article_socialShare .tw-icon svg{width:1.75remrem;height:1.75rem;fill:var(--color-white)}
.article_socialShare .fb-icon{background:var(--facebook-bg)}
.article_socialShare .fb-icon svg{width:1rem;height:1rem;fill:#fff}
.article_socialShare .wh-icon svg{width:1.75rem;height:1.75rem}
.flexWrap{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.liveTVBadge{border:1px solid #dc0000;padding:2px;border-radius:4px;width:93px;height:35px}
.liveTVBadge a{display:flex;align-items:center;justify-content:space-between}
.liveTVBadge .blinker{width:6px;height:6px;margin:0 5px}
.liveTVBadge span{font-size:15px;line-height:33px;font-weight:700;height:29px}
.liveTVBadge span:last-child{width:32px;background-color:#dc0000;text-align:center;border-radius:0 3px 3px 0;color:#fff;margin-left:5px}
.flexWrap .followUs{display:flex;align-items:center;flex-wrap:wrap}
.flexWrap .followUs span{font-size:.75rem;font-weight:600;line-height:1.5rem;margin-right:.3125rem}
.flexWrap .followUs .socialLinks{display:flex;align-items:center;justify-content:center;border:1px solid #eee;padding:.25rem 0;border-radius:4px;box-shadow:0 0 4px 0 #0000001a}
.flexWrap .followUs .socialLinks a{display:block;border-right:1px solid #eee;padding:0 .625rem}
.flexWrap .followUs .socialLinks a:last-child{border-right:none}
.flexWrap .followUs .socialLinks a svg{width:30px;height:30px;display:block}
.blinker{display:inline-block;background:#d80202;border-radius:50%;box-shadow:0 0 0 0 #d80202;margin:0 8px 0 0;height:10px;width:10px;transform:scale(1);animation:2s infinite pulse-red}
.featured_video{margin:0 -.9375rem 1.25rem -.9375rem}
.photoCard_Wrapper{background:var(--photocard-bg);margin-bottom:1.875rem}
.photoCard_Wrapper .imgwrap amp-img{display:block}
.photoCard_Wrapper .cardInfo_Wrapper .photoDesc{padding:.9375rem;color:var(--primary-text);font-size:1.25rem;font-weight:400;line-height:1.875rem}
.photoCard_Wrapper .cardInfo_Wrapper .cardAction{padding:.75rem .9375rem;border-top:1px solid var(--photocard-bdr);display:flex;justify-content:space-between;align-items:center}
.photoCard_Wrapper .cardInfo_Wrapper .cardAction .article_socialShare{margin-bottom:0}
.photoCard_Wrapper .cardInfo_Wrapper .cardAction .photoCount{font-size:1.125rem;font-weight:400;line-height:1.875rem;color:var(--primary-text)}
.photoCard_Wrapper .cardInfo_Wrapper .cardAction .photoCount span{font-weight:700;color:var(--color-red);font-size:1.375rem}
.live_blog_tag{font-weight:600;padding:0 15px;margin-bottom:.625rem}
.live_blog_tag{font-size:1rem;text-transform:uppercase;line-height:2rem;border-radius:20px;background:var(--color-red);color:var(--color-white);padding:0 10px;display:inline-flex;align-items:center;vertical-align:middle;font-family:sans-serif}
.live_blog_tag .blinker{animation:pulse-white 2s infinite;background:rgb(255 255 255);box-shadow:0 0 0 0 rgb(255 255 255);margin:0 5px 0 0}
.blogHeading{color:var(--primary-text);font-size:1.875rem;font-weight:800;margin-bottom:1.25rem;text-transform:capitalize}
.liveblogClosed_Message{color:#dc0000;text-align:center;margin-bottom:.625rem}
.liveBlog_Listing .lb_timestamp{width:11.4375rem;height:1.875rem;border-radius:.25rem;border:1px solid var(--color-red);background:var(--body-bg);display:inline-block;text-align:center;margin-bottom:1.5625rem;line-height:1.875rem}
.liveBlog_Listing .lb_timestamp span{color:var(--color-red);font-size:.875rem;font-weight:500}
.liveBlog_Listing ul{border-left:1px solid var(--color-red)}
.liveBlog_Listing li{margin-bottom:1.875rem;padding-left:1.25rem;position:relative}
.liveBlog_Listing li .h3{color:var(--primary-text);font-size:1.375rem;font-weight:700;line-height:1.75rem;margin-bottom:.625rem}
.liveBlog_Listing li p{color:var(--primary-text);font-size:1.25rem;font-weight:400}
.liveBlog_Listing li p img{width:100%}
.liveBlog_Listing .lb_list_wrap::before{content:"";width:.75rem;height:.75rem;position:absolute;top:0;left:-6px;border-radius:6px;border:.19rem solid var(--color-red);background:#ffdede}
.liveBlog_Listing li.lbAds{padding:0}
.liveBlog_Listing ol,.liveBlog_Listing ul{padding-left:0}
.liveBlog_Listing ol li,.liveBlog_Listing ul li{list-style-type:none}
.tv9lb-liveblog-closed-message{margin-bottom:.9375rem;text-align:center;color:var(--color-red)}
.liveBlog_Listing ul ol,.liveBlog_Listing ul ul{padding-left:25px}
.liveBlog_Listing ul ul li{border-left:none;list-style:disc;padding-left:0}
.liveBlog_Listing ul ol li{border-left:none;list-style:decimal;padding-left:0}
.key_event{background-color:#f5e4d5;padding:.9375rem;margin-bottom:1.875rem}
.key_event h2.liveblogbg{font-size:1.75rem;font-weight:700;margin-bottom:.9375rem;color:var(--primary-text)}
.key_event_list{padding-left:30px}
.key_event_list li{color:var(--primary-text);font-size:1.25rem;font-weight:400;list-style:disc;line-height:1.625rem}
.tv9_footer{margin-top:1.25rem}
.tv9_footerlinks{background:#fff;box-shadow:0 -5px 15px rgba(0,0,0,.1);padding:20px 0}
.tv9_footerlinks .container{display:flex;justify-content:center;flex-wrap:wrap}
.footer_LHS{width:100%}
.footer_RHS{width:100%}
.footer_LHS .fsocial{display:flex;justify-content:center;margin-bottom:20px}
.footer_LHS .fsocial amp-img{display:block;margin-right:20px}
.fsocial_links span{text-align:center;font-weight:400;font-size:15px;line-height:24px;text-transform:uppercase;display:block;margin-bottom:.625rem;color:#666}
.fsocial_links ul{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;align-items:center;list-style-type:none}
.fsocial_links ul li svg{width:24px;height:24px;display:block}
.download_links{text-align:center;display:flex;justify-content:center}
.download_links a,.download_links img{display:inline-block}
.download_links amp-img{margin:0 5px}
.footer_navlinks{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;margin-bottom:.94rem}
.footer_navlinks a{font-weight:400;font-size:14px;text-align:center;color:#666;margin-right:15px;padding-bottom:10px}
.footer_netlinks{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;margin-bottom:10px}
.footer_netlinks strong{font-weight:700;font-size:15px;line-height:24px;text-align:left;color:#666;display:block;margin:0 0 8px 0;min-width:115px}
.footer_netlinks ul{text-align:center}
.footer_netlinks li{display:inline-block;margin-right:9px;margin-bottom:10px}
.footer_netlinks li a{font-weight:400;font-size:14px;color:#666}
.copyright{font-weight:400;font-size:12px;line-height:19px;color:#666;text-align:center}
.rnw_wrapper{background-color:#1a1a2e;padding:0.9375rem;margin-bottom:1.875rem}
.rnw_heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem}
.rnw_heading h2,.rnw_heading h2 a{color:#fff;font-size:1.5rem;line-height:1;font-weight:800;text-transform:capitalize}
.rnw_heading h2 a::after{content:"";border:solid #fff;border-width:0 2px 2px 0;border-radius:2px;display:inline-block;padding:3px;transform:rotate(-45deg);margin-left:5px;vertical-align:middle}
.rnw_scroll{display:flex;overflow-x:auto;-webkit-overflow-scrolling:touch;gap:0.75rem;padding-bottom:0.5rem}
.rnw_scroll::-webkit-scrollbar{display:none}
.rnw_card{flex:0 0 65%;min-width:200px;background:#2a2a3e;border-radius:4px;overflow:hidden}
@media(min-width:768px){.rnw_card{flex:0 0 24%}}
.rnw_imgwrap amp-img{display:block;width:100%}
.rnw_card_title{padding:0.5rem 0.625rem}
.rnw_card_title h3{margin:0}
.rnw_card_title h3 a{font-size:0.9375rem;line-height:1.4;font-weight:500;color:#fff;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;text-decoration:none}
.rnw_media_info{margin-bottom:0.25rem}
.rnw_media_info span{color:#ffc900;font-size:0.75rem;font-weight:400;text-transform:uppercase}
.rpw_wrapper{background-color:var(--photogal-widget-bg);padding:0.9375rem;margin-bottom:1.875rem}
.rpw_heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem}
.rpw_heading h2,.rpw_heading h2 a{color:#fff;font-size:1.5rem;line-height:1;font-weight:800;text-transform:capitalize}
.rpw_heading h2 a::after{content:"";border:solid #fff;border-width:0 2px 2px 0;border-radius:2px;display:inline-block;padding:3px;transform:rotate(-45deg);margin-left:5px;vertical-align:middle}
.rpw_scroll{display:flex;overflow-x:auto;-webkit-overflow-scrolling:touch;gap:0.75rem;padding-bottom:0.5rem}
.rpw_scroll::-webkit-scrollbar{display:none}
.rpw_card{flex:0 0 65%;min-width:200px;background:var(--phototxt-bg);border-radius:4px;overflow:hidden}
@media(min-width:768px){.rpw_card{flex:0 0 24%}}
.rpw_imgwrap amp-img{display:block;width:100%}
.rpw_card_title{padding:0.5rem 0.625rem}
.rpw_card_title h3{margin:0}
.rpw_card_title h3 a{font-size:0.9375rem;line-height:1.4;font-weight:500;color:#fff;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;text-decoration:none}
.rpw_media_info{margin-bottom:0.25rem}
.rpw_media_info span{color:#ffc900;font-size:0.75rem;font-weight:400;text-transform:uppercase}
.rvw_wrapper{background-color:var(--videogal-widget-bg);padding:0.9375rem;margin-bottom:1.875rem}
.rvw_heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem}
.rvw_heading h2,.rvw_heading h2 a{color:#fff;font-size:1.5rem;line-height:1;font-weight:800;text-transform:capitalize}
.rvw_heading h2 a::after{content:"";border:solid #fff;border-width:0 2px 2px 0;border-radius:2px;display:inline-block;padding:3px;transform:rotate(-45deg);margin-left:5px;vertical-align:middle}
.rvw_scroll{display:flex;overflow-x:auto;-webkit-overflow-scrolling:touch;gap:0.75rem;padding-bottom:0.5rem}
.rvw_scroll::-webkit-scrollbar{display:none}
.rvw_card{flex:0 0 65%;min-width:180px;border-radius:4px;overflow:hidden}
@media(min-width:768px){.rvw_card{flex:0 0 24%}}
.rvw_card a{text-decoration:none}
.rvw_imgwrap{position:relative}
.rvw_imgwrap amp-img{display:block;width:100%}
.rvw_play_icon{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:40px;height:40px;background:rgba(0,0,0,.6);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.2rem}
.rvw_card_title{padding:0.5rem 0}
.rvw_card_title h3{margin:0;font-size:0.9375rem;line-height:1.4;font-weight:500;color:#fff;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.rwsw_wrapper{background-color:var(--webstory-widget-bg);padding:0.9375rem;margin-bottom:1.875rem}
.rwsw_heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem}
.rwsw_heading h2,.rwsw_heading h2 a{color:#fff;font-size:1.5rem;line-height:1;font-weight:800;text-transform:capitalize}
.rwsw_heading h2 a::after{content:"";border:solid #fff;border-width:0 2px 2px 0;border-radius:2px;display:inline-block;padding:3px;transform:rotate(-45deg);margin-left:5px;vertical-align:middle}
.rwsw_scroll{display:flex;overflow-x:auto;-webkit-overflow-scrolling:touch;gap:0.75rem;padding-bottom:0.5rem}
.rwsw_scroll::-webkit-scrollbar{display:none}
.rwsw_card{flex:0 0 45%;min-width:140px;border-radius:8px;overflow:hidden}
@media(min-width:768px){.rwsw_card{flex:0 0 20%}}
.rwsw_card a{text-decoration:none}
.rwsw_imgwrap{border-radius:8px;overflow:hidden}
.rwsw_imgwrap amp-img{display:block;width:100%}
.rwsw_card_title{padding:0.5rem 0}
.rwsw_card_title h3{margin:0;font-size:0.875rem;line-height:1.3;font-weight:500;color:#fff;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.rhn_wrapper{margin-bottom:1.875rem}
.rhn_list{display:flex;flex-direction:column;gap:0.75rem}
.rhn_item{border-bottom:1px solid var(--border-color);padding-bottom:0.75rem}
.rhn_item a{display:flex;gap:0.75rem;text-decoration:none}
.rhn_thumb{flex:0 0 120px;width:120px}
.rhn_thumb amp-img{display:block;width:100%;border-radius:4px}
.rhn_title h3{margin:0;font-size:0.9375rem;line-height:1.4;font-weight:600;color:var(--primary-text);overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}
.rhnp_wrapper{margin-bottom:1.875rem}
.rhnp_list{display:flex;flex-direction:column;gap:0.75rem}
.rhnp_item{border-bottom:1px solid var(--border-color);padding-bottom:0.75rem}
.rhnp_item a{display:flex;gap:0.75rem;text-decoration:none}
.rhnp_thumb{flex:0 0 120px;width:120px;position:relative}
.rhnp_thumb amp-img{display:block;width:100%;border-radius:4px}
.rhnp_icon{position:absolute;bottom:4px;right:4px;background:rgba(0,0,0,.6);color:#ffc900;font-size:0.75rem;padding:2px 5px;border-radius:3px}
.rhnp_title h3{margin:0;font-size:0.9375rem;line-height:1.4;font-weight:600;color:var(--primary-text);overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}
.rhnp_viewmore{text-align:center;margin-top:0.75rem}
.rhnp_viewmore a{color:var(--color-red);font-weight:600;font-size:0.875rem;text-decoration:none}
`;
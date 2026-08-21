import Image from "next/image";




// category-listing-common-widget == > CategoryListingCommonWidget
export default function TaxRegimeWidget() {
  return (
    <>           <style>{`
    .gridTemplateCols{display:grid;grid-template-columns:1fr 356px;gap:20px}
.gridTemplateCols .colLHS{display:grid;grid-template-columns:1fr 1fr;gap:1.38rem}
/*--IT Slab Start-- */
.ITslab_Wrapper{margin-bottom:2.5rem}
.ITslab_Wrapper .tab_list{display:inline-flex;justify-content:center}
.ITslab_Wrapper .tab_item{background:#f6d8be;border-radius:50px;cursor:pointer;font-weight:400;font-size:.875rem;text-transform:capitalize;color:#000;padding:.625rem 1rem;margin:0 5px;text-align:center;font-family:sans-serif}
.ITslab_Wrapper .tab_item.is--active{background:#262a33;color:#fff;font-weight:700}
.ITslab_Wrapper .tab_sub_list{flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;justify-content:flex-start;margin-bottom:10px;background-color:#f5e4d5;border-radius:1.875rem}
.ITslab_Wrapper .tab_sub_list::-webkit-scrollbar{display:none}
.ITslab_Wrapper .tab_sub_list .tab_item{background:0 0;font-weight:400;font-size:1rem;line-height:1.375rem;text-transform:capitalize;color:#000;padding:.44rem 1.12rem;position:relative;display:flex;align-items:center;flex:0 0 auto;margin:0}
.ITslab_Wrapper .tab_sub_list .tab_item:last-child{margin-right:0}
.ITslab_Wrapper .tab_sub_list .tab_item.is--active{color:#fff;background:#b00020;font-weight:700}
.ITslab_Wrapper .tab_content-item{display:none}
.ITslab_Wrapper .tab_content-item.is--active{display:block}
.ITslab_Wrapper .tab_head{font-weight:700;font-size:18px;line-height:29px;text-transform:capitalize;margin-bottom:10px;text-align:left}
.ITslab_Wrapper .tab_content table{background:#ffffff;width:100%;border-collapse:separate;border-spacing:0;border:1px solid #d7d7d7;overflow:hidden}
.ITslab_Wrapper .tab_content table tr td,.ITslab_Wrapper .tab_content table tr th{padding:.79rem;color:#292929;text-align:left;line-height:1}
.ITslab_Wrapper .tab_content table tr th:first-child{border-top-left-radius:4px;border-right:1px solid #d7d7d7}
.ITslab_Wrapper .tab_content table tr th:last-child{border-top-right-radius:4px}
.ITslab_Wrapper .tab_content table tr td{font-weight:500;font-size:14px;border-bottom:1px solid #d7d7d7;border-right:1px solid #d7d7d7}
.ITslab_Wrapper .tab_content table tr td:last-child{border-right:none}
.ITslab_Wrapper .tab_content table tr:last-child td{border-bottom:none}
.ITslab_Wrapper .tab_content table tr th{font-weight:600;font-size:16px;line-height:20px;width:50%;color:#fff;font-family:sans-serif}
.ITslab_Wrapper .tab_content-item .flexWrapper{display:flex;flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch}
.ITslab_Wrapper .tab_content-item .flexWrapper::-webkit-scrollbar{display:none}
.ITslab_Wrapper .tab_content-item .flexWrapper .table_responsive{width:49%;margin-right:2%;flex:1}
.ITslab_Wrapper .tab_content-item .flexWrapper .table_responsive:last-child{margin-right:0}
.ITslab_Wrapper .tab_content-item .tab_content{background:#f4f4f4;padding:1.12rem;border-radius: 0.3125rem;}
.ITslab_Wrapper .tab_content-item .flexWrapper .table_responsive thead{background-color:#262a33}
 
/*--IT Slab End-- */
/*--Poll Rating Start-- */
.budgetPollRating_Wrapper{margin-bottom:2.5rem}
.budgetPollRating_Wrapper .rangeSliderWidget_Wrapper{background:#f4f4f4;padding:.62rem;text-align:center}
.budgetPollRating_Wrapper .rangeSliderWidget_Wrapper .imgwrap img{width:100%;display:block;margin-bottom:.3125rem;height:128px;object-fit:cover;}
.budgetPollRating_Wrapper .rangeSliderWidget_Wrapper .ratingCaption{font-size:1.375rem;font-weight:700;text-align:center;margin-bottom:1.8rem}
.budgetPollRating_Wrapper .rangeSliderWidget_Wrapper .slider-container{position:relative;display:inline-block;text-align:center}
.budgetPollRating_Wrapper .rangeSliderWidget_Wrapper .image-container{position:absolute;top:-40%;transform:translateY(-40%) scale(.8);transition:left .2s ease;width:31px;height:37px;pointer-events:none}
.budgetPollRating_Wrapper .rangeSliderWidget_Wrapper .image-container img{width:100%;height:100%}
.budgetPollRating_Wrapper .rangeSliderWidget_Wrapper input[type=range]{-webkit-appearance:none;width:316px;height:10px;background:linear-gradient(to right,#b70d20,#fe951e,#d717a7,#2215f5,#16ae0f);border-radius:5px;outline:0;cursor:pointer}
.budgetPollRating_Wrapper .rangeSliderWidget_Wrapper input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:20px;height:20px;background:0 0;border-radius:50%;border:6px solid #fff;cursor:pointer}
.budgetPollRating_Wrapper .rangeSliderWidget_Wrapper input[type=range]::-moz-range-thumb{width:20px;height:20px;background:#fff;border-radius:50%;border:2px solid #000;cursor:pointer}
.budgetPollRating_Wrapper .rangeSliderWidget_Wrapper .labels{display:flex;justify-content:space-between}
.budgetPollRating_Wrapper .rangeSliderWidget_Wrapper .labels span{font-size:1.0625rem;color:#000;font-weight:500;width:20px;height:20px}
.budgetPollRating_Wrapper .rangeSliderWidget_Wrapper .rateinfo{font-size:1rem}
.budgetPollRating_Wrapper .rangeSliderWidget_Wrapper .submit-button{width:6.1875rem;height:2.25rem;background-color:#262a33;color:#fff;font-size:1rem;font-weight:600;display:flex;justify-content:center;align-items:center;border-radius:50px;margin:0 auto 10px auto;cursor:pointer}
.budgetPollRating_Wrapper .rangeSliderWidget_Wrapper .results{font-size:1rem}
/*--Poll Rating End-- */
    @media(max-width:768px){
        .gridTemplateCols{grid-template-columns:1fr;margin-bottom:1.25rem;}
        .gridTemplateCols .colLHS{grid-template-columns:1fr;gap:0}
        .ITslab_Wrapper .section_heading{justify-content:center}
        .ITslab_Wrapper .section_heading .tab_list{margin-top:.9375rem}
        .ITslab_Wrapper .tab_content-item .flexWrapper .table_responsive{width:89%;margin-right:3%;flex:0 0 auto}
        .ITslab_Wrapper .tab_content-item .tab_content{padding:.625rem;margin:0 -.9375rem 0 -.9375rem}
        .ITslab_Wrapper .tab_content-item .flexWrapper .table_responsive:last-child{margin-right:0}
           .budgetPollRating_Wrapper .rangeSliderWidget_Wrapper input[type=range]{width:316px}
       
    }

      `}</style>


    
<div className="gridTemplateCols">
    {/* <!--Budget Announcement Start--> */}
    <section className="ITslab_Wrapper">
        <div className="tab">
            <div className="section_heading">
                <h2 className="h2">जानें अपना इनकम टैक्स स्लैब</h2>
            </div>
            <div className="tab_content">
                <div className="tab_content-item tab is--active">
                    <div className="tab_content">
                        <div className="tab_content-item is--active">
                            <div className="flexWrapper">
                                <div className="table_responsive">
                                 <div className="tab_head">Tax Regime 2025-26</div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Income Tax Slab</th>
                                                <th>Income Tax Rate</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>₹0 - ₹4 लाख</td>
                                                <td>शून्य (0%)</td>
                                            </tr>
                                            <tr>
                                                <td>₹4,00,001 - ₹8 लाख</td>
                                                <td>5%</td>
                                            </tr>
                                            <tr>
                                                <td>₹8,00,001 - ₹12 लाख</td>
                                                <td>10%</td>
                                            </tr>
                                            <tr>
                                                <td>₹12,00,001 - ₹16 लाख</td>
                                                <td>15%</td>
                                            </tr>
                                            <tr>
                                                <td>₹16,00,001 - ₹20 लाख</td>
                                                <td>20%</td>
                                            </tr>
                                            <tr>
                                                <td>₹20,00,001 - ₹24 लाख</td>
                                                <td>25%</td>
                                            </tr>
                                            <tr>
                                                <td>₹24 लाख से अधिक</td>
                                                <td>30%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="table_responsive">
                                    <div className="tab_head">Tax Regime 2026-27</div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Income Tax Slab</th>
                                                <th>Income Tax Rate</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>₹0 - ₹4 लाख</td>
                                                <td>शून्य (0%)</td>
                                            </tr>
                                            <tr>
                                                <td>₹4,00,001 - ₹8 लाख</td>
                                                <td>5%</td>
                                            </tr>
                                            <tr>
                                                <td>₹8,00,001 - ₹12 लाख</td>
                                                <td>10%</td>
                                            </tr>
                                            <tr>
                                                <td>₹12,00,001 - ₹16 लाख</td>
                                                <td>15%</td>
                                            </tr>
                                            <tr>
                                                <td>₹20,00,001 - ₹24 लाख</td>
                                                <td>25%</td>
                                            </tr>
                                            <tr>
                                                <td>₹24 लाख से अधिक</td>
                                                <td>30%</td>
                                            </tr>
                                            <tr>
                                                <td>₹16,00,001 - ₹20 लाख</td>
                                                <td>20%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                       <div style={{ marginTop: "5px" }}>
                        <strong>No Change in Income Tax Slabs for FY 2026–27 (Same as FY 2025–26)</strong>
                       </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!--Budget Announcement end--> */}

    <iframe className="autoResizeFrame" src="https://e.tv9hindi.com/budget/rate-budget/index-en.html" frameBorder="0" scrolling="no"  style={{
      width: "100%",
      height: "500px",
      border: "none",
     
    }}></iframe>

    

</div>
    </>
  );
}
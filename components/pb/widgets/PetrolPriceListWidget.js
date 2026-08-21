"use client";

import Image from "next/image";

const CITIES = [
  { label: "Lucknow", url: "https://www.tv9hindi.com/business/petrol-price-today/lucknow-petrol-rate.html" },
  { label: "Patna", url: "https://www.tv9hindi.com/business/petrol-price-today/patna-petrol-rate.html" },
  { label: "Pune", url: "https://www.tv9hindi.com/business/petrol-price-today/pune-petrol-rate.html" },
  { label: "Mumbai", url: "https://www.tv9hindi.com/business/petrol-price-today/mumbai-petrol-rate.html" },
  { label: "Kolhapur", url: "https://www.tv9hindi.com/business/petrol-price-today/kolhapur-petrol-rate.html" },
  { label: "Ghaziabad", url: "https://www.tv9hindi.com/business/petrol-price-today/ghaziabad-petrol-rate.html" },
  { label: "Kolkata", url: "https://www.tv9hindi.com/business/petrol-price-today/kolkata-petrol-rate.html" },
  { label: "Ludhiana", url: "https://www.tv9hindi.com/business/petrol-price-today/ludhiana-petrol-rate.html" },
  { label: "Mysore", url: "https://www.tv9hindi.com/business/petrol-price-today/mysore-petrol-rate.html" },
  { label: "Nagpur", url: "https://www.tv9hindi.com/business/petrol-price-today/nagpur-petrol-rate.html" },
  { label: "Nashik", url: "https://www.tv9hindi.com/business/petrol-price-today/nashik-petrol-rate.html" },
  { label: "Raipur", url: "https://www.tv9hindi.com/business/petrol-price-today/raipur-petrol-rate.html" },
  { label: "Rajkot", url: "https://www.tv9hindi.com/business/petrol-price-today/rajkot-petrol-rate.html" },
  { label: "Ranchi", url: "https://www.tv9hindi.com/business/petrol-price-today/ranchi-petrol-rate.html" },
  { label: "Shimla", url: "https://www.tv9hindi.com/business/petrol-price-today/shimla-petrol-rate.html" },
  { label: "Srinagar", url: "https://www.tv9hindi.com/business/petrol-price-today/srinagar-petrol-rate.html" },
  { label: "Surat", url: "https://www.tv9hindi.com/business/petrol-price-today/surat-petrol-rate.html" },
  { label: "Thane", url: "https://www.tv9hindi.com/business/petrol-price-today/thane-petrol-rate.html" },
  { label: "Vadodara", url: "https://www.tv9hindi.com/business/petrol-price-today/vadodara-petrol-rate.html" },
  { label: "Faridabad", url: "https://www.tv9hindi.com/business/petrol-price-today/faridabad-petrol-rate.html" },
];

export default function PetrolPriceListWidget() {
  return (
    <>
  <div>
		<div className="SearchCitywise">
			<div className="searchHead">
				<h3>Find <span>Fuel Prices</span> in Your Cities</h3>
				<div className="pumpIcon">
					<svg className=""><use href="#fuelpumpicon"></use></svg>
				</div>
			</div>
			<div className="priceFinder">
				<div className="input-label">
					<div className="radio-group">
						<input value="petrol" defaultChecked={true} name="fuelType" id="petrolRadio" type="radio" />
						<label htmlFor="petrolRadio" className="fuelabel">Petrol</label>
					</div>
					<div className="radio-group">
						<input value="diesel" name="fuelType" type="radio" id="dieselRadio" />
						<label htmlFor="dieselRadio" className="fuelabel">Diesel</label>
					</div>
					<div className="radio-group">
						<input value="lpg" name="fuelType" type="radio" id="lpgRadio" />
						<label htmlFor="lpgRadio" className="fuelabel">LPG</label>
					</div>
				</div>
				<select
					className="cityDropdown"
					id="petrol-city-list"
					name="petrol-city"
					defaultValue=""
					onChange={(e) => {
						const url = e.target.value;
						if (url) {
							window.location.href = url;
						}
					}}
				>
					<option value="">Select City</option>
					{CITIES.map((city) => (
						<option key={city.url} value={city.url}>
							{city.label}
						</option>
					))}
				</select>
				<a className="resetbtn" id="petrol-resetbtn" href="https://www.tv9hindi.com/business/petrol-price-today.html">
          RESET
        </a>								
			</div>
		</div>



    {/* Petrol Price Detail Code starts */}
    <div className="fuelDetails">	
	    <div className="oneCity">
				</div>
	
		
        {/* All City */}
	   				
        <div className="cityWise">
            <div className="Fuelhead">
			    <h2>				
				PetrolPrice - City wise list
            </h2></div>
			<div id="petrolContent" className="petrolContent">				
				<table>
						<thead>
							<tr>
								<th>City</th><th>Petrol Price (₹/L)</th><th>Change (₹/L)<sup>*</sup></th></tr>
						</thead>
						<tbody><tr><td><a href="https://www.tv9hindi.com/business/petrol-price-today/lucknow-petrol-rate.html">Lucknow</a></td><td><span className="fuelPrice">96.57 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/petrol-price-today/patna-petrol-rate.html">Patna</a></td><td><span className="fuelPrice">107.24 </span></td><td><span className="priceDiff down">-0.30</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/petrol-price-today/pune-petrol-rate.html">Pune</a></td><td><span className="fuelPrice">106.07 </span></td><td><span className="priceDiff down">-0.24</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/petrol-price-today/mumbai-petrol-rate.html">Mumbai</a></td><td><span className="fuelPrice">106.31 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/petrol-price-today/kolhapur-petrol-rate.html">Kolhapur</a></td><td><span className="fuelPrice">106.51 </span></td><td><span className="priceDiff down">-0.04</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/petrol-price-today/ghaziabad-petrol-rate.html">Ghaziabad</a></td><td><span className="fuelPrice">96.58 </span></td><td><span className="priceDiff down">0.14</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/petrol-price-today/kolkata-petrol-rate.html">Kolkata</a></td><td><span className="fuelPrice">106.03 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/petrol-price-today/ludhiana-petrol-rate.html">Ludhiana</a></td><td><span className="fuelPrice">98.73 </span></td><td><span className="priceDiff down">0.28</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/petrol-price-today/mysore-petrol-rate.html">Mysore</a></td><td><span className="fuelPrice">101.50 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/petrol-price-today/nagpur-petrol-rate.html">Nagpur</a></td><td><span className="fuelPrice">106.04 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/petrol-price-today/nashik-petrol-rate.html">Nashik</a></td><td><span className="fuelPrice">106.86 </span></td><td><span className="priceDiff down">0.64</span></td></tr><tr className="morePetrolCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/petrol-price-today/raipur-petrol-rate.html">Raipur</a></td><td><span className="fuelPrice">102.45 </span></td><td><span className="priceDiff down">0.13</span></td></tr><tr className="morePetrolCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/petrol-price-today/rajkot-petrol-rate.html">Rajkot</a></td><td><span className="fuelPrice">96.19 </span></td><td><span className="priceDiff down">0.01</span></td></tr><tr className="morePetrolCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/petrol-price-today/ranchi-petrol-rate.html">Ranchi</a></td><td><span className="fuelPrice">99.84 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr className="morePetrolCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/petrol-price-today/shimla-petrol-rate.html">Shimla</a></td><td><span className="fuelPrice">97.71 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr className="morePetrolCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/petrol-price-today/srinagar-petrol-rate.html">Srinagar</a></td><td><span className="fuelPrice">101.34 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr className="morePetrolCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/petrol-price-today/surat-petrol-rate.html">Surat</a></td><td><span className="fuelPrice">96.30 </span></td><td><span className="priceDiff down">-0.12</span></td></tr><tr className="morePetrolCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/petrol-price-today/thane-petrol-rate.html">Thane</a></td><td><span className="fuelPrice">106.45 </span></td><td><span className="priceDiff down">0.07</span></td></tr><tr className="morePetrolCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/petrol-price-today/vadodara-petrol-rate.html">Vadodara</a></td><td><span className="fuelPrice">96.08 </span></td><td><span className="priceDiff down">0.04</span></td></tr><tr className="morePetrolCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/petrol-price-today/faridabad-petrol-rate.html">Faridabad</a></td><td><span className="fuelPrice">97.49 </span></td><td><span className="priceDiff equal">0.00</span></td></tr></tbody>
						</table><div className="disclaimer">डिस्क्लेमर: यहां दी गईं पेट्रोल-डीज़ल की कीमतों में बदलाव डेली बेसिस पर होता है. यह कीमतें थर्ड पार्टी द्वारा ली गई हैं, इसलिए तकनीकी गड़बड़ी की गुंजाइश है. किसी भी शहर की कीमतों में अंतर मिलने पर tv9Hindi उत्तरदायी नहीं हैं.</div><div className="viewData loadmore" id="loadmorePetrolCity">
							<span className="viewAll load-more-btn">View More</span>
						</div>	
			</div>
			{/* Diseal Content Start */}
			<div id="dieselContent" style={{ display: "none" }}>
			  <table>
						<thead>
							<tr>
								<th>City</th><th>Diesel Price (₹/L)</th><th>Change (₹/L)<sup>*</sup></th></tr>
						</thead>
						<tbody><tr><td><a href="https://www.tv9hindi.com/business/diesel-price-today/patna-diesel-rate.html">Patna</a></td><td><span className="fuelPrice">94.04 </span></td><td><span className="priceDiff down">-0.28</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/diesel-price-today/pune-diesel-rate.html">Pune</a></td><td><span className="fuelPrice">92.58 </span></td><td><span className="priceDiff down">-0.24</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/diesel-price-today/mumbai-diesel-rate.html">Mumbai</a></td><td><span className="fuelPrice">94.27 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/diesel-price-today/salem-diesel-rate.html">Salem</a></td><td><span className="fuelPrice">95.36 </span></td><td><span className="priceDiff down">-0.13</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/diesel-price-today/mysore-diesel-rate.html">Mysore</a></td><td><span className="fuelPrice">87.49 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/diesel-price-today/nagpur-diesel-rate.html">Nagpur</a></td><td><span className="fuelPrice">92.59 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/diesel-price-today/nashik-diesel-rate.html">Nashik</a></td><td><span className="fuelPrice">93.36 </span></td><td><span className="priceDiff down">0.63</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/diesel-price-today/raipur-diesel-rate.html">Raipur</a></td><td><span className="fuelPrice">95.44 </span></td><td><span className="priceDiff down">0.14</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/diesel-price-today/rajkot-diesel-rate.html">Rajkot</a></td><td><span className="fuelPrice">91.95 </span></td><td><span className="priceDiff down">0.01</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/diesel-price-today/ranchi-diesel-rate.html">Ranchi</a></td><td><span className="fuelPrice">94.65 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/diesel-price-today/thiruvananthapuram-diesel-rate.html">Thiruvananthapuram</a></td><td><span className="fuelPrice">98.68 </span></td><td><span className="priceDiff down">0.44</span></td></tr><tr className="moreDieselCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/diesel-price-today/shimla-diesel-rate.html">Shimla</a></td><td><span className="fuelPrice">86.71 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr className="moreDieselCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/diesel-price-today/srinagar-diesel-rate.html">Srinagar</a></td><td><span className="fuelPrice">86.59 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr className="moreDieselCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/diesel-price-today/surat-diesel-rate.html">Surat</a></td><td><span className="fuelPrice">92.06 </span></td><td><span className="priceDiff down">-0.12</span></td></tr><tr className="moreDieselCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/diesel-price-today/thane-diesel-rate.html">Thane</a></td><td><span className="fuelPrice">94.41 </span></td><td><span className="priceDiff down">0.07</span></td></tr><tr className="moreDieselCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/diesel-price-today/vadodara-diesel-rate.html">Vadodara</a></td><td><span className="fuelPrice">91.82 </span></td><td><span className="priceDiff down">0.04</span></td></tr><tr className="moreDieselCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/diesel-price-today/varanasi-diesel-rate.html">Varanasi</a></td><td><span className="fuelPrice">89.93 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr className="moreDieselCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/diesel-price-today/faridabad-diesel-rate.html">Faridabad</a></td><td><span className="fuelPrice">90.35 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr className="moreDieselCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/diesel-price-today/ghaziabad-diesel-rate.html">Ghaziabad</a></td><td><span className="fuelPrice">89.75 </span></td><td><span className="priceDiff down">0.13</span></td></tr><tr className="moreDieselCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/diesel-price-today/noida-diesel-rate.html">Noida</a></td><td><span className="fuelPrice">90.14 </span></td><td><span className="priceDiff equal">0.00</span></td></tr></tbody>
						</table><div className="disclaimer">डिस्क्लेमर: यहां दी गईं पेट्रोल-डीज़ल की कीमतों में बदलाव डेली बेसिस पर होता है. यह कीमतें थर्ड पार्टी द्वारा ली गई हैं, इसलिए तकनीकी गड़बड़ी की गुंजाइश है. किसी भी शहर की कीमतों में अंतर मिलने पर tv9Hindi उत्तरदायी नहीं हैं.</div><div className="viewData loadmore" id="loadmoreDieselCity">
							<span className="viewAll load-more-btn">View More</span>
						</div>	
			</div>
			{/* LPG Content Start */}
			<div id="dieselContent" style={{ display: "none" }}>
			  <table>
						<thead>
							<tr>
								<th>City</th><th>LPG (₹/Cylinder)</th><th>Change (₹/Cylinder)<sup>*</sup></th></tr>
						</thead>
						<tbody><tr><td><a href="https://www.tv9hindi.com/business/lpg-price-today/patna-lpg-rate.html">Patna</a></td><td><span className="fuelPrice">1,201.00 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/lpg-price-today/pune-lpg-rate.html">Pune</a></td><td><span className="fuelPrice">1,106.00 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/lpg-price-today/shimla-lpg-rate.html">Shimla</a></td><td><span className="fuelPrice">1,148.50 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/lpg-price-today/mysore-lpg-rate.html">Mysore</a></td><td><span className="fuelPrice">1,107.50 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/lpg-price-today/nagpur-lpg-rate.html">Nagpur</a></td><td><span className="fuelPrice">1,154.50 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/lpg-price-today/nashik-lpg-rate.html">Nashik</a></td><td><span className="fuelPrice">1,106.50 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/lpg-price-today/raipur-lpg-rate.html">Raipur</a></td><td><span className="fuelPrice">1,174.00 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/lpg-price-today/rajkot-lpg-rate.html">Rajkot</a></td><td><span className="fuelPrice">1,108.00 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/lpg-price-today/ranchi-lpg-rate.html">Ranchi</a></td><td><span className="fuelPrice">1,160.50 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/lpg-price-today/salem-lpg-rate.html">Salem</a></td><td><span className="fuelPrice">1,136.50 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr><td><a href="https://www.tv9hindi.com/business/lpg-price-today/thiruvananthapuram-lpg-rate.html">Thiruvananthapuram</a></td><td><span className="fuelPrice">1,112.00 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr className="moreLpgCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/lpg-price-today/srinagar-lpg-rate.html">Srinagar</a></td><td><span className="fuelPrice">1,219.00 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr className="moreLpgCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/lpg-price-today/surat-lpg-rate.html">Surat</a></td><td><span className="fuelPrice">1,108.50 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr className="moreLpgCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/lpg-price-today/thane-lpg-rate.html">Thane</a></td><td><span className="fuelPrice">1,102.50 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr className="moreLpgCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/lpg-price-today/vadodara-lpg-rate.html">Vadodara</a></td><td><span className="fuelPrice">1,109.00 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr className="moreLpgCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/lpg-price-today/varanasi-lpg-rate.html">Varanasi</a></td><td><span className="fuelPrice">1,166.50 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr className="moreLpgCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/lpg-price-today/visakhapatnam-lpg-rate.html">Visakhapatnam</a></td><td><span className="fuelPrice">1,112.00 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr className="moreLpgCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/lpg-price-today/faridabad-lpg-rate.html">Faridabad</a></td><td><span className="fuelPrice">1,104.50 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr className="moreLpgCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/lpg-price-today/ghaziabad-lpg-rate.html">Ghaziabad</a></td><td><span className="fuelPrice">1,100.50 </span></td><td><span className="priceDiff equal">0.00</span></td></tr><tr className="moreLpgCity" style={{ display: "none" }}><td><a href="https://www.tv9hindi.com/business/lpg-price-today/noida-lpg-rate.html">Noida</a></td><td><span className="fuelPrice">1,100.50 </span></td><td><span className="priceDiff equal">0.00</span></td></tr></tbody>
						</table><div className="disclaimer">डिस्क्लेमर: यहां दी गईं LPG की कीमतों में बदलाव मासिक आधार पर होता है. यह कीमतें थर्ड पार्टी द्वारा ली गई हैं, इसलिए तकनीकी गड़बड़ी की गुंजाइश है. किसी भी शहर की कीमतों में बदलाव के लिए tv9Hindi उत्तरदायी नहीं हैं. </div><div className="viewData loadmore" id="loadmoreLpgCity">
							<span className="viewAll load-more-btn">View More</span>
						</div>	
			</div>

        </div>
       
    </div>


	

	

{/* Petrol Price Detail Code ends */}


  
{/* Tag Listing Start */}

<div className="common_section">
    <div className="tv9common-heading">
            <h1 className="h2"><a href="/topic/petrol-diesel" title="Petrol Rate Latest News">Petrol Rate Latest News</a></h1>
          </div>
    <div className="tv9_landingWidget">
        <figure> <a href="https://www.tv9hindi.com/business/petrol-diesel-price-may-surge-more-in-coming-days-says-crisil-3807518.html" title="अभी और महंगा होगा पेट्रोल-डीजल, इतनी हो सकती है कीमतें">
      <div className="imgThumb"> 
      <Image width={320} height={180} className="lazy" src="https://images.tv9hindi.com/wp-content/uploads/2026/05/petrol-diesel-price-hike-3.webp?w=280&amp;q=51&amp;ar=16:9" alt="अभी और महंगा होगा पेट्रोल-डीजल, इतनी हो सकती है कीमतें" title="अभी और महंगा होगा पेट्रोल-डीजल, इतनी हो सकती है कीमतें" />
      
         
      
       </div>
      <div className="card_title">
       <h3 className="h3">अभी और महंगा होगा पेट्रोल-डीजल, इतनी हो सकती है कीमतें</h3>
	</div>
      </a> </figure>
        <figure> <a href="https://www.tv9hindi.com/business/petrol-diesel-price-today-2-june-2026-know-crude-oil-price-in-international-market-3806865.html" title="कच्चा तेल 100 डॉलर से नीचे, आम लोगों को फ्यूल पर लगातार 8वें दिन राहत">
      <div className="imgThumb"> 
      <Image width={320} height={180} className="lazy" src="https://images.tv9hindi.com/wp-content/uploads/2026/05/petrol-diesel-price-3.webp?w=280&amp;q=51&amp;ar=16:9" alt="कच्चा तेल 100 डॉलर से नीचे, आम लोगों को फ्यूल पर लगातार 8वें दिन राहत" title="कच्चा तेल 100 डॉलर से नीचे, आम लोगों को फ्यूल पर लगातार 8वें दिन राहत" />
      
         
      
       </div>
      <div className="card_title">
       <h3 className="h3">कच्चा तेल 100 डॉलर से नीचे, आम लोगों को फ्यूल पर लगातार 8वें दिन राहत</h3>
	</div>
      </a> </figure>
        <figure> <a href="https://www.tv9hindi.com/business/crude-oil-prices-rise-in-international-markets-have-petrol-and-diesel-become-more-expensive-in-country-3805624.html" title="कच्चे तेल की कीमतों में तेजी...क्या देश में महंगा हुआ पेट्रोल और डीजल?">
      <div className="imgThumb"> 
      <Image width={320} height={180} className="lazy" src="https://images.tv9hindi.com/wp-content/uploads/2026/05/petrol-diesel-price-hike-3.webp?w=280&amp;q=51&amp;ar=16:9" alt="कच्चे तेल की कीमतों में तेजी...क्या देश में महंगा हुआ पेट्रोल और डीजल?" title="कच्चे तेल की कीमतों में तेजी...क्या देश में महंगा हुआ पेट्रोल और डीजल?" />
      
         
      
       </div>
      <div className="card_title">
       <h3 className="h3">कच्चे तेल की कीमतों में तेजी...क्या देश में महंगा हुआ पेट्रोल और डीजल?</h3>
	</div>
      </a> </figure>
        <figure> <a href="https://www.tv9hindi.com/business/sri-lanka-revises-retail-fuel-prices-amid-west-asia-conflict-3804879.html" title="भारत के पड़ोस में 24 रुपए महंगा हुआ पेट्रोल, डीजल में 15 रुपए का इजाफा">
      <div className="imgThumb"> 
      <Image width={320} height={180} className="lazy" src="https://images.tv9hindi.com/wp-content/uploads/2026/05/petrol-diesel-price-3.webp?w=280&amp;q=51&amp;ar=16:9" alt="भारत के पड़ोस में 24 रुपए महंगा हुआ पेट्रोल, डीजल में 15 रुपए का इजाफा" title="भारत के पड़ोस में 24 रुपए महंगा हुआ पेट्रोल, डीजल में 15 रुपए का इजाफा" />
      
         
      
       </div>
      <div className="card_title">
       <h3 className="h3">भारत के पड़ोस में 24 रुपए महंगा हुआ पेट्रोल, डीजल में 15 रुपए का इजाफा</h3>
	</div>
      </a> </figure>
        <figure> <a href="https://www.tv9hindi.com/business/petrol-diesel-price-today-31-may-2026-latest-fuel-rates-delhi-mumbai-noida-3804588.html" title="पेट्रोल-डीजल के ताजा रेट जारी, चेक कर लें अपने शहर का भाव">
      <div className="imgThumb"> 
      <Image width={320} height={180} className="lazy" src="https://images.tv9hindi.com/wp-content/uploads/2026/05/petrol-diesel-price-hike-3.webp?w=280&amp;q=51&amp;ar=16:9" alt="पेट्रोल-डीजल के ताजा रेट जारी, चेक कर लें अपने शहर का भाव" title="पेट्रोल-डीजल के ताजा रेट जारी, चेक कर लें अपने शहर का भाव" />
      
         
      
       </div>
      <div className="card_title">
       <h3 className="h3">पेट्रोल-डीजल के ताजा रेट जारी, चेक कर लें अपने शहर का भाव</h3>
	</div>
      </a> </figure>
        <figure> <a href="https://www.tv9hindi.com/business/crude-oil-price-crash-behind-the-historic-11-pc-weekly-drop-and-future-price-forecast-3804126.html" title="कच्चे तेल में 7 हफ्तों की सबसे बड़ी वीकली गिरावट...सस्ता होगा पेट्रोल?">
      <div className="imgThumb"> 
      <Image width={320} height={180} className="lazy" src="https://images.tv9hindi.com/wp-content/uploads/2026/05/crude-oil.jpg?w=280&amp;q=51&amp;ar=16:9" alt="कच्चे तेल में 7 हफ्तों की सबसे बड़ी वीकली गिरावट...सस्ता होगा पेट्रोल?" title="कच्चे तेल में 7 हफ्तों की सबसे बड़ी वीकली गिरावट...सस्ता होगा पेट्रोल?" />
      
         
      
       </div>
      <div className="card_title">
       <h3 className="h3">कच्चे तेल में 7 हफ्तों की सबसे बड़ी वीकली गिरावट...सस्ता होगा पेट्रोल?</h3>
	</div>
      </a> </figure>
    <div className="adsCont desktop Topads">
    <div id="desktop_top_ads_lhs" data-google-query-id="">
        <div id="google_ads_iframe_/21874393853/tv9_hindi_web/tv9_hindi_web_al_btf_1_970x90_0__container__" style={{ border: "0pt", width: "970px", height: "0px" }}></div></div>
</div>

<div className="adsCont mobile">
    <div id="mobile_top_300x250"> 
    </div>
</div>

    <figure> <a href="https://www.tv9hindi.com/business/iran-war-inflation-impact-how-geopolitical-tension-is-destroying-common-mans-budget-3804018.html" title="जंग की मार, बजट लाचार! ईरान युद्ध से लगातार बढ़ रहा महंगाई का बुखार">
      <div className="imgThumb"> 
      <Image width={320} height={180} className="lazy" src="https://images.tv9hindi.com/wp-content/uploads/2026/05/inflation.jpeg?w=280&amp;q=51&amp;ar=16:9" alt="जंग की मार, बजट लाचार! ईरान युद्ध से लगातार बढ़ रहा महंगाई का बुखार" title="जंग की मार, बजट लाचार! ईरान युद्ध से लगातार बढ़ रहा महंगाई का बुखार" />
      
         
      
       </div>
      <div className="card_title">
       <h3 className="h3">जंग की मार, बजट लाचार! ईरान युद्ध से लगातार बढ़ रहा महंगाई का बुखार</h3>
	</div>
      </a> </figure>
        <figure> <a href="https://www.tv9hindi.com/business/petrol-diesel-price-today-no-change-despite-crude-oil-drop-3803546.html" title="पेट्रोल-डीजल के ताजा रेट जारी, चेक कर लें अपने शहर का भाव">
      <div className="imgThumb"> 
      <Image width={320} height={180} className="lazy" src="https://images.tv9hindi.com/wp-content/uploads/2026/05/petrol-diesel-price-today-1.jpg?w=280&amp;q=51&amp;ar=16:9" alt="पेट्रोल-डीजल के ताजा रेट जारी, चेक कर लें अपने शहर का भाव" title="पेट्रोल-डीजल के ताजा रेट जारी, चेक कर लें अपने शहर का भाव" />
      
         
      
       </div>
      <div className="card_title">
       <h3 className="h3">पेट्रोल-डीजल के ताजा रेट जारी, चेक कर लें अपने शहर का भाव</h3>
	</div>
      </a> </figure>
        <figure> <a href="https://www.tv9hindi.com/business/global-oil-supply-risk-due-to-hormuz-toll-3801953.html" title="अगर होर्मुज में लगने लगा टोल, तो दुनिया की इकोनॉमी पर क्या होगा असर?">
      <div className="imgThumb"> 
      <Image width={320} height={180} className="lazy" src="https://images.tv9hindi.com/wp-content/uploads/2026/05/strait-of-hormuz-1.jpg?w=280&amp;q=51&amp;ar=16:9" alt="अगर होर्मुज में लगने लगा टोल, तो दुनिया की इकोनॉमी पर क्या होगा असर?" title="अगर होर्मुज में लगने लगा टोल, तो दुनिया की इकोनॉमी पर क्या होगा असर?" />
      
         
      
       </div>
      <div className="card_title">
       <h3 className="h3">अगर होर्मुज में लगने लगा टोल, तो दुनिया की इकोनॉमी पर क्या होगा असर?</h3>
	</div>
      </a> </figure>
        <figure> <a href="https://www.tv9hindi.com/business/petrol-diesel-price-today-28-may-2026-fuel-rates-stable-after-hike-3801178.html" title="पेट्रोल-डीजल के ताजा रेट जारी, चेक कर लें अपने शहर का भाव">
      <div className="imgThumb"> 
      <Image width={320} height={180} className="lazy" src="https://images.tv9hindi.com/wp-content/uploads/2026/05/petrol-diesel-price-today-1.jpg?w=280&amp;q=51&amp;ar=16:9" alt="पेट्रोल-डीजल के ताजा रेट जारी, चेक कर लें अपने शहर का भाव" title="पेट्रोल-डीजल के ताजा रेट जारी, चेक कर लें अपने शहर का भाव" />
      
         
      
       </div>
      <div className="card_title">
       <h3 className="h3">पेट्रोल-डीजल के ताजा रेट जारी, चेक कर लें अपने शहर का भाव</h3>
	</div>
      </a> </figure>
        <figure> <a href="https://www.tv9hindi.com/business/crude-oil-prices-plunge-amid-hopes-of-us-iran-deal-crude-drops-over-5-percent-3800729.html" title="US-ईरान समझौते की उम्मीद बढ़ी, कच्चे तेल की कीमतों में भारी गिरावट">
      <div className="imgThumb"> 
      <Image width={320} height={180} className="lazy" src="https://images.tv9hindi.com/wp-content/uploads/2026/05/wti-crude-oil.jpg?w=280&amp;q=51&amp;ar=16:9" alt="US-ईरान समझौते की उम्मीद बढ़ी, कच्चे तेल की कीमतों में भारी गिरावट" title="US-ईरान समझौते की उम्मीद बढ़ी, कच्चे तेल की कीमतों में भारी गिरावट" />
      
         
      
       </div>
      <div className="card_title">
       <h3 className="h3">US-ईरान समझौते की उम्मीद बढ़ी, कच्चे तेल की कीमतों में भारी गिरावट</h3>
	</div>
      </a> </figure>
        <figure> <a href="https://www.tv9hindi.com/business/why-fuel-retailers-losing-rs-7-8-per-litre-need-85-crude-oil-to-stop-bleeding-cash-3800147.html" title="कब खत्म होगा OMCs का घाटा? कच्चे तेल की किस कीमत पर है बाजार की नजर">
      <div className="imgThumb"> 
      <Image width={320} height={180} className="lazy" src="https://images.tv9hindi.com/wp-content/uploads/2026/05/petrol-diesel-price-hike-4.jpg?w=280&amp;q=51&amp;ar=16:9" alt="कब खत्म होगा OMCs का घाटा? कच्चे तेल की किस कीमत पर है बाजार की नजर" title="कब खत्म होगा OMCs का घाटा? कच्चे तेल की किस कीमत पर है बाजार की नजर" />
      
         
      
       </div>
      <div className="card_title">
       <h3 className="h3">कब खत्म होगा OMCs का घाटा? कच्चे तेल की किस कीमत पर है बाजार की नजर</h3>
	</div>
      </a> </figure>
    <div className="adsCont desktop Topads">
    <div id="desktop_top_ads_lhs2" data-google-query-id="">
            <div id="google_ads_iframe_/21874393853/tv9_hindi_web/tv9_hindi_web_al_btf_2_970x90_0__container__" style={{ border: "0pt", width: "970px", height: "0px" }}></div></div>
</div>

<div className="adsCont mobile">
    <div id="mobile_medium_300x250"> 
    </div>
</div>

    <figure> <a href="https://www.tv9hindi.com/business/petrol-diesel-cng-price-today-27-may-latest-rate-update-3799859.html" title="पेट्रोल-डीजल के ताजा रेट जारी, चेक कर लें अपने शहर का भाव">
      <div className="imgThumb"> 
      <Image width={320} height={180} className="lazy" src="https://images.tv9hindi.com/wp-content/uploads/2026/05/petrol-diesel-price-3.webp?w=280&amp;q=51&amp;ar=16:9" alt="पेट्रोल-डीजल के ताजा रेट जारी, चेक कर लें अपने शहर का भाव" title="पेट्रोल-डीजल के ताजा रेट जारी, चेक कर लें अपने शहर का भाव" />
      
         
      
       </div>
      <div className="card_title">
       <h3 className="h3">पेट्रोल-डीजल के ताजा रेट जारी, चेक कर लें अपने शहर का भाव</h3>
	</div>
      </a> </figure>
        <figure> <a href="https://www.tv9hindi.com/business/petrol-diesel-price-today-latest-fuel-rates-update-3798791.html" title="पेट्रोल-डीजल के ताजा रेट जारी, चेक कर लें अपने शहर का भाव">
      <div className="imgThumb"> 
      <Image width={320} height={180} className="lazy" src="https://images.tv9hindi.com/wp-content/uploads/2026/05/petrol-diesel-price-hike-3.webp?w=280&amp;q=51&amp;ar=16:9" alt="पेट्रोल-डीजल के ताजा रेट जारी, चेक कर लें अपने शहर का भाव" title="पेट्रोल-डीजल के ताजा रेट जारी, चेक कर लें अपने शहर का भाव" />
      
         
      
       </div>
      <div className="card_title">
       <h3 className="h3">पेट्रोल-डीजल के ताजा रेट जारी, चेक कर लें अपने शहर का भाव</h3>
	</div>
      </a> </figure>
        <figure> <a href="https://www.tv9hindi.com/business/fuel-price-hike-oil-companies-losses-drop-from-rs-1000-crore-to-rs-600-crore-3798304.html" title="Fuel Price Hike: 1000 करोड़ से 600 करोड़ पर आया Oil कंपनियों का नुकसान">
      <div className="imgThumb"> 
      <Image width={320} height={180} className="lazy" src="https://images.tv9hindi.com/wp-content/uploads/2026/05/omcs.jpg?w=280&amp;q=51&amp;ar=16:9" alt="Fuel Price Hike: 1000 करोड़ से 600 करोड़ पर आया Oil कंपनियों का नुकसान" title="Fuel Price Hike: 1000 करोड़ से 600 करोड़ पर आया Oil कंपनियों का नुकसान" />
      
         
      
       </div>
      <div className="card_title">
       <h3 className="h3">Fuel Price Hike: 1000 करोड़ से 600 करोड़ पर आया Oil कंपनियों का नुकसान</h3>
	</div>
      </a> </figure>
        <figure> <a href="https://www.tv9hindi.com/business/fuel-price-hike-impact-50-pc-see-rise-in-transport-and-service-costs-reveals-survey-3798265.html" title="महंगाई का डबल अटैक: फ्यूल के दाम बढ़ते ही महंगा हुआ ट्रांसपोर्ट!">
      <div className="imgThumb"> 
      <Image width={320} height={180} className="lazy" src="https://images.tv9hindi.com/wp-content/uploads/2026/05/petrol-diesel-price-hike-3.jpg?w=280&amp;q=51&amp;ar=16:9" alt="महंगाई का डबल अटैक: फ्यूल के दाम बढ़ते ही महंगा हुआ ट्रांसपोर्ट!" title="महंगाई का डबल अटैक: फ्यूल के दाम बढ़ते ही महंगा हुआ ट्रांसपोर्ट!" />
      
         
      
       </div>
      <div className="card_title">
       <h3 className="h3">महंगाई का डबल अटैक: फ्यूल के दाम बढ़ते ही महंगा हुआ ट्रांसपोर्ट!</h3>
	</div>
      </a> </figure>
        <figure> <a href="https://www.tv9hindi.com/videos/petrol-diesel-price-hike-congress-protest-jaipur-impact-fuel-cost-increase-rahul-gandhi-3798020.html" title="तेल में फिर लगी 'आग'... दाम 100 के पार, जयपुर में कांग्रेस का प्रदर्शन">
      <div className="imgThumb"> 
      <Image width={320} height={180} className="lazy" src="https://images.tv9hindi.com/wp-content/uploads/2026/05/cong-protest.jpg?w=280&amp;q=51&amp;ar=16:9" alt="तेल में फिर लगी 'आग'... दाम 100 के पार, जयपुर में कांग्रेस का प्रदर्शन" title="तेल में फिर लगी 'आग'... दाम 100 के पार, जयपुर में कांग्रेस का प्रदर्शन" />
      
        <span className="icon_Comn"><svg><use href="#v_icon"></use></svg></span> 
      
       </div>
      <div className="card_title">
       <h3 className="h3">तेल में फिर लगी 'आग'... दाम 100 के पार, जयपुर में कांग्रेस का प्रदर्शन</h3>
	</div>
      </a> </figure>
        <figure> <a href="https://www.tv9hindi.com/business/oil-marketing-companies-share-surge-by-6-percent-3797962.html" title="कच्चा तेल सस्ता होते ही दौड़ पड़े तेल कंपनियों के शेयर, 6% की आई तेजी">
      <div className="imgThumb"> 
      <Image width={320} height={180} className="lazy" src="https://images.tv9hindi.com/wp-content/uploads/2026/05/petrol-diesel-price-3.jpg?w=280&amp;q=51&amp;ar=16:9" alt="कच्चा तेल सस्ता होते ही दौड़ पड़े तेल कंपनियों के शेयर, 6% की आई तेजी" title="कच्चा तेल सस्ता होते ही दौड़ पड़े तेल कंपनियों के शेयर, 6% की आई तेजी" />
      
         
      
       </div>
      <div className="card_title">
       <h3 className="h3">कच्चा तेल सस्ता होते ही दौड़ पड़े तेल कंपनियों के शेयर, 6% की आई तेजी</h3>
	</div>
      </a> </figure>
    <div className="adsCont desktop Topads">
    <div id="desktop_top_ads_lhs3" data-google-query-id="">
        <div id="google_ads_iframe_/21874393853/tv9_hindi_web/tv9_hindi_web_al_btf_3_970x90_0__container__" style={{ border: "0pt", width: "970px", height: "0px" }}></div></div>
</div>

<div className="adsCont mobile">
    <div id="mobile_bottom_300x250"> 
    </div>
</div>

    <figure> <a href="https://www.tv9hindi.com/business/why-india-raised-petrol-and-diesel-far-less-than-most-countries-3797953.html" title="बाकी देशों के मुकाबले भारत में कम बढ़े पेट्रोल-डीजल के दाम">
      <div className="imgThumb"> 
      <Image width={320} height={180} className="lazy" src="https://images.tv9hindi.com/wp-content/uploads/2026/05/petrol-diesel-price-4.jpg?w=280&amp;q=51&amp;ar=16:9" alt="बाकी देशों के मुकाबले भारत में कम बढ़े पेट्रोल-डीजल के दाम" title="बाकी देशों के मुकाबले भारत में कम बढ़े पेट्रोल-डीजल के दाम" />
      
         
      
       </div>
      <div className="card_title">
       <h3 className="h3">बाकी देशों के मुकाबले भारत में कम बढ़े पेट्रोल-डीजल के दाम</h3>
	</div>
      </a> </figure>
        <figure> <a href="https://www.tv9hindi.com/business/petrol-diesel-price-hike-today-may-25-delhi-mumbai-rates-3797611.html" title="पेट्रोल-डीजल ने फिर दिया झटका, जानें-इन शहरों में क्या है कीमत">
      <div className="imgThumb"> 
      <Image width={320} height={180} className="lazy" src="https://images.tv9hindi.com/wp-content/uploads/2026/05/petrol-diesel-price-today-1.jpg?w=280&amp;q=51&amp;ar=16:9" alt="पेट्रोल-डीजल ने फिर दिया झटका, जानें-इन शहरों में क्या है कीमत" title="पेट्रोल-डीजल ने फिर दिया झटका, जानें-इन शहरों में क्या है कीमत" />
      
         
      
       </div>
      <div className="card_title">
       <h3 className="h3">पेट्रोल-डीजल ने फिर दिया झटका, जानें-इन शहरों में क्या है कीमत</h3>
	</div>
      </a> </figure>
        <figure> <a href="https://www.tv9hindi.com/business/fuel-price-increased-2-week-4th-time-petrol-cross-100-rupees-diesel-95-3797555.html" title="पेट्रोल ने लगाया शतक, डीजल 95 के पार, 11 दिन में चौथी बार बढ़े दाम">
      <div className="imgThumb"> 
      <Image width={320} height={180} className="lazy" src="https://images.tv9hindi.com/wp-content/uploads/2026/05/petrol-diesel.jpg?w=280&amp;q=51&amp;ar=16:9" alt="पेट्रोल ने लगाया शतक, डीजल 95 के पार, 11 दिन में चौथी बार बढ़े दाम" title="पेट्रोल ने लगाया शतक, डीजल 95 के पार, 11 दिन में चौथी बार बढ़े दाम" />
      
         
      
       </div>
      <div className="card_title">
       <h3 className="h3">पेट्रोल ने लगाया शतक, डीजल 95 के पार, 11 दिन में चौथी बार बढ़े दाम</h3>
	</div>
      </a> </figure>
        <figure> <a href="https://www.tv9hindi.com/business/will-petrol-and-diesel-prices-rise-further-bpcl-gives-a-hint-3796803.html" title="क्या अभी और बढ़ेंगी पेट्रोल-डीजल की कीमतें, BPCL ने दिया संकेत">
      <div className="imgThumb"> 
      <Image width={320} height={180} className="lazy" src="https://images.tv9hindi.com/wp-content/uploads/2026/05/petrol-diesel.jpg?w=280&amp;q=51&amp;ar=16:9" alt="क्या अभी और बढ़ेंगी पेट्रोल-डीजल की कीमतें, BPCL ने दिया संकेत" title="क्या अभी और बढ़ेंगी पेट्रोल-डीजल की कीमतें, BPCL ने दिया संकेत" />
      
         
      
       </div>
      <div className="card_title">
       <h3 className="h3">क्या अभी और बढ़ेंगी पेट्रोल-डीजल की कीमतें, BPCL ने दिया संकेत</h3>
	</div>
      </a> </figure>
        <figure> <a href="https://www.tv9hindi.com/business/tensions-escalate-amidst-the-hormuz-crisis-then-this-friend-of-india-steps-up-crude-oil-supplies-3796521.html" title="होर्मुज संकट में भारत को राहत, इस खास दोस्त ने बढ़ाई तेल की सप्लाई">
      <div className="imgThumb"> 
      <Image width={320} height={180} className="lazy" src="https://images.tv9hindi.com/wp-content/uploads/2026/05/oil-4.jpg?w=280&amp;q=51&amp;ar=16:9" alt="होर्मुज संकट में भारत को राहत, इस खास दोस्त ने बढ़ाई तेल की सप्लाई" title="होर्मुज संकट में भारत को राहत, इस खास दोस्त ने बढ़ाई तेल की सप्लाई" />
      
         
      
       </div>
      <div className="card_title">
       <h3 className="h3">होर्मुज संकट में भारत को राहत, इस खास दोस्त ने बढ़ाई तेल की सप्लाई</h3>
	</div>
      </a> </figure>
        <figure> <a href="https://www.tv9hindi.com/india/fuel-price-hike-kejriwal-criticizes-central-government-rising-petrol-diesel-rates-3796313.html" title="पेट्रोल-डीजल के बढ़ते दामों पर बिफरे केजरीवाल, केंद्र पर बोला हमला">
      <div className="imgThumb"> 
      <Image width={320} height={180} className="lazy" src="https://images.tv9hindi.com/wp-content/uploads/2026/05/aap-arvind-kejriwal-pc.jpg?w=280&amp;q=51&amp;ar=16:9" alt="पेट्रोल-डीजल के बढ़ते दामों पर बिफरे केजरीवाल, केंद्र पर बोला हमला" title="पेट्रोल-डीजल के बढ़ते दामों पर बिफरे केजरीवाल, केंद्र पर बोला हमला" />
      
         
      
       </div>
      <div className="card_title">
       <h3 className="h3">पेट्रोल-डीजल के बढ़ते दामों पर बिफरे केजरीवाल, केंद्र पर बोला हमला</h3>
	</div>
      </a> </figure>
    <div className="adsCont desktop Topads">
    <div id="desktop_top_ads_lhs4" data-google-query-id="">
   
    <div id="google_ads_iframe_/21874393853/tv9_hindi_web/tv9_hindi_web_al_btf_4_970x90_0__container__" style={{ border: "0pt", width: "970px", height: "0px" }}></div></div>
</div>

<div className="adsCont mobile">
    <div id="mobile_medium2_300x250"> 
    </div>
</div>

      {/* ListItem schema JSON-LD removed (invalid in JSX) */}
	{/* <button id="category_more_posts" onClick="load_more_news_posts_new('595431','1',24)" data-value="595431" data-page="1" className="load-more-btn" data-main="1">Load More</button> */}
	</div>
</div>
{/* Tag Listing End */}

{/* adgebra / taboola removed (invalid in JSX) */}
</div>
<style jsx>{`
 
 .SearchCitywise{background: #ffffff;width: 100%;margin: 10px 0;box-shadow: 0px 0px 4px rgb(0 0 0 / 8%);border-radius: 10px;padding: 15px 30px;}
    .searchHead{display: flex;align-items: center;justify-content: space-between;}
    .searchHead h3{text-transform: uppercase;font-size: 17px;font-weight: 400;position: relative;margin-right: 5px;}
    .searchHead h3:before {position: absolute;content: '';border-bottom: 1px solid #4c4c4c;width: 62px;right: 0;bottom: 5px;}
    .searchHead h3 span {color: #dc0000;font-size: 32px;display: block;font-weight: bold;}
    .priceFinder {padding: 10px 0;}
    .SearchCitywise .priceFinder .radio-group{display: inline-flex;align-items: center;margin-bottom: 10px;}
    .SearchCitywise .priceFinder .input-label input[type="radio"] {width: 18px;height: 18px;}
    .SearchCitywise .priceFinder .input-label .fuelabel {margin: 0 10px 0 6px;}
    .SearchCitywise .priceFinder select{padding: 6px;border-radius: 6px;border-color: #AEAEB0;width: 70%;}
    .SearchCitywise .resetbtn{color: #fff;background: #dc0000;border-radius: 6px;display: inline-block;font-size: 14px;width: 25%;margin-left: 3%;text-align: center;padding: 7px;}
    .pumpIcon svg{height: 64px;width: 66px;}
    .Fuelhead h2, .Fuelhead h1{text-align: center;font-size: 22px;margin-bottom: 10px;}
    .petrolContent {border-radius: 10px;border: 1px solid #cecece;margin-bottom: 10px;}
    .fuelDetails table{width: 100%;}
    .fuelDetails table thead{background: #e5e5e5;}
    .fuelDetails table tr {line-height: 2.5rem;text-transform: capitalize;font-size: 14px;}
    .fuelDetails table thead tr th:nth-child(2), .fuelDetails table tr td:nth-child(2) {border-left: 1px solid #e5e5e5;border-right: 1px solid #e5e5e5;text-align: center;}
    .fuelDetails table thead tr th:nth-child(2) {border-left: 1px solid #cecece;border-right: 1px solid #cecece;}
    .fuelDetails table tr td{border-bottom: 1px solid #cecece;}
    .fuelDetails table tr td{border-bottom: 1px solid #cecece;}
    .fuelDetails table tbody{background: #ffffff;font-size: 13px;}
    .fuelDetails table tbody tr td:last-child{text-align: center;}
    .fuelDetails table thead tr th:first-child, .fuelDetails table tbody tr td:first-child{text-align: left;padding-left: 12px;}
    .priceDiff.up {color: #dc0000;}
    .priceDiff.down {color: #009b2c;}
    .fuelDetails_cityWise table tbody .unit {color: #aaaaaa;}
    .fuelDetails table thead tr th:first-child{border-top-left-radius: 10px;}
    .fuelDetails table thead tr th:last-child{border-top-right-radius: 10px;}
    .fuelDetails table tr:last-child td:first-child{border-bottom-left-radius: 10px;}
    .fuelDetails table tr:last-child td:last-child{border-bottom-right-radius: 10px;border-bottom: 0;}
    .fuelDetails table tr:last-child td{border-bottom: 0;}
    .diffup::after{content: '\\2191';color: #dc0000;}
    .diffdown::after{content: '\\2193';color: #009b2c;}
    .diffequal::after{content: '\\21C6';}
    .disclaimer {font-size: 12px;color: #626161;line-height: 20px;margin-top:10px}
    @media(min-width:1000px){
        .SearchCitywise{display: flex;justify-content: space-between;}
    }


`}</style>
    </>
  );
}


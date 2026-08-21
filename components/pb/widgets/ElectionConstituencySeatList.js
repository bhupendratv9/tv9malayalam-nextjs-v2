"use client";
export default function ElectionConstituencySeatList() {
  return (
    <>
    <div className="constituency-seat-list">
      <div className="tv9common-heading">

        <h2 className="h2">
          <span id="Current_state">पश्चिम बंगाल</span> विधानसभा चुनाव 2026 : सभी सीटों के क्षेत्रवार नतीजे
        </h2>

        {/* Loading Overlay */}
        <div
          id="loading-overlay"
          style={{
            display: "none",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 1000,
          }}
        >
          <p
            style={{
              color: "white",
              textAlign: "center",
              marginTop: "20%",
              fontSize: "24px",
            }}
          >
            Loading, please wait...
          </p>
        </div>

        {/* Search */}
        <div className="seat_search">
          <div className="constFilter">

            <div id="form">
              <input
                name="search"
                id="searchBox"
                autoComplete="off"
                type="text"
                placeholder="Search Assembly"
                className="constsearch searchtext"
                title="constituency search"
              />

              <svg>
                <use href="#ic_search"></use>
              </svg>

              <div
                id="suggestions-container"
                className="suggestions-container"
              ></div>
            </div>

            {/* Dropdown (hidden) */}
            <div className="select1" style={{ display: "none" }}>
              <select
                name="constituency"
                id="searchConstituency"
                className="selectDropdown1"
              >
                <option value="">All</option>
                <option value="Alipurduars">Alipurduars</option>
                <option value="Amdanga">Amdanga</option>
                <option value="Amta">Amta</option>
                <option value="Arambag">Arambag</option>
              </select>
            </div>
          </div>

          {/* State Dropdown */}
          <div className="select1">
            <select name="state">
              <option value="">Select State</option>
              <option value="west-bengal">West Bengal</option>
              <option value="kerala">Kerala</option>
              <option value="tamil-nadu">Tamil Nadu</option>
              <option value="assam">Assam</option>
              <option value="puducherry">Puducherry</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="constituency-list">
        <div className="table-responsive">
          <table>
            <thead>
              <tr className="table-headers">
                <th>राज्य</th>
                <th>सीट</th>
                <th>प्रत्याशी</th>
                <th>वोट</th>
                <th>पार्टी</th>
                <th>स्टेटस</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>West Bengal</td>
                <td>Alipurduars</td>
                <td>Paritosh Das</td>
                <td>1,43,242</td>
                <td>
                  <span style={{ color: "#f47216" }}>BJP</span>
                </td>
                <td>
                  <span className="status Won">Won</span>
                </td>
              </tr>

              <tr>
                <td>West Bengal</td>
                <td>Amdanga</td>
                <td>Mohammad Kasem Siddique</td>
                <td>81,670</td>
                <td>
                  <span style={{ color: "#20c646" }}>TMC</span>
                </td>
                <td>
                  <span className="status Won">Won</span>
                </td>
              </tr>

              <tr>
                <td>West Bengal</td>
                <td>Amta</td>
                <td>Amit Samanta</td>
                <td>1,04,649</td>
                <td>
                  <span style={{ color: "#f47216" }}>BJP</span>
                </td>
                <td>
                  <span className="status Won">Won</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
   <style jsx global>{`
    .constituency-seat-list{padding:0.625rem 0;}
    .constituency-seat-list .tv9common-heading:before {content: none;}
    .constituency-seat-list .constituency-list{border: 1px solid #DEDEDF;border-radius:8px;}
    .constituency-seat-list .constituency-list table{ width: 100%;border-collapse: collapse;text-align: left;}
    .constituency-seat-list .constituency-list table tbody tr{border-bottom: 1px solid #DEDEDF;}
    .constituency-seat-list .constituency-list table tbody tr:last-child{border-bottom:none;}
    .constituency-seat-list .constituency-list table td,.constituency-seat-list .constituency-list table th{ padding: 15px;}
    .constituency-seat-list .constituency-list table th{background-color: #F2F2F2;font-size:18px;line-height:28px;}
    .constituency-seat-list .constituency-list table th:first-child{border-top-left-radius:8px;}
    .constituency-seat-list .constituency-list table th:last-child{border-top-right-radius:8px;text-align:center;min-width:120px;}
    .constituency-seat-list .constituency-list table td{font-size:16px;line-height:25px;font-weight:400;}
    .constituency-seat-list .constituency-list table td:last-child{text-align:center;}
    .constituency-seat-list .constituency-list table td .partyName{font-size:14px;font-weight:500;line-height:22px;display:block;}
    .seat_search{display: flex;justify-content: flex-start;}
    .select1{position:relative;width:150px;height:38px;background:#fff;margin-left:10px;}
    .select1 select{outline:none;height:38px;font-size: .875rem;width:100%;padding:.5rem .62rem;border:1px solid #d9d9d9;border-radius:.25rem;background:#fff;}
    .select{position:relative;width:150px;height:38px;border-radius:.25rem;border:1px solid #dededf;background:#fff;margin-left:10px;}
    .select .selectBtn{padding:.5rem .62rem;box-sizing:border-box;border-radius:.25rem;width:100%;cursor:pointer;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-weight:500;font-size:.875rem;height:36px;display:flex;align-items:center}
    .select .selectBtn:after{content:"";position:absolute;top:46%;right:10px;width:8px;height:8px;-webkit-transform:translateY(-50%) rotate(45deg);transform:translateY(-50%) rotate(45deg);border-right:2px solid #000;border-bottom:2px solid #000;transition:.2s ease}
    .select .selectDropdown{position:absolute;top:100%;width:100%;border-radius:0 0 .25rem .25rem;overflow:hidden;z-index:1;background:#fff;-webkit-transform:scale(1,0);transform:scale(1,0);-webkit-transform-origin:top center;transform-origin:top center;visibility:hidden;transition:.2s ease;border-radius:.25rem;border:1px solid #dededf}
    .select .selectDropdown .option{padding:10px;box-sizing:border-box;cursor:pointer}
    .select .selectDropdown .option:hover{background:#f8f8f8}
    .select .selectDropdown.toggle{visibility:visible;-webkit-transform:scale(1,1);transform:scale(1,1)}
    .constFilter #form{border-radius:0.25rem;border:1px solid #d9d9d9;background:#FFF;line-height:1;height:38px;padding:9px;display:flex;align-items:center;width:175px;font-size: .875rem;}
    .constFilter .constsearch{border:0;outline:0;height:22px;width:135px;font-size: .875rem;}
    .constFilter .constsearch::placeholder{color:#000;opacity:1;}
    .constFilter .constsearch::-ms-input-placeholder{color:#000;}
    .constFilter  input:focus::placeholder {color: transparent;}
    .constFilter svg{width:0.9375rem;height:0.9375rem;display:block;fill:transparent;margin-left:5px;cursor:pointer;}
    .constFilter{display:flex;align-items:center;position: relative;}
    .suggestions-container {position: absolute;display:none;top: 36px;width: 100%;left: 0;border-radius: 0 0 0.25rem 0.25rem;z-index: 999;background: #fff;border-radius: 0.25rem;border: 1px solid #dededf;}
    .suggestions-container div{padding: 10px;background: #fff;cursor: pointer;}
    .suggestions-container div:hover{background: #f8f8f8;}
    .constituency-seat-list .constituency-list table td .clickBtn{text-decoration: underline;color: #1450d2;}
    .constituency-seat-list .constituency-list table td .clickBtn:hover{text-decoration: none;}
    .constituency-seat-list .constituency-list table td .status {color: #fff;border-radius: 20px;text-align: center;padding:4px 12px;font-size: 0.75rem;line-height: 15px;}
    .constituency-list .table-responsive {overflow: auto;max-height:800px;}
    @media(max-width:767px) {
        .constituency-seat-list .tv9common-heading{flex-wrap:wrap;}
        .constituency-seat-list .tv9common-heading .h2{margin-bottom:10px;}
        .searchTab{flex-wrap: wrap;width:100%;flex-direction: column-reverse;}
        .seat_search{width:100%;margin-bottom:0.5rem;justify-content: space-between;}
        .stateConstFilter{width:100%;}
        .stateConstFilter #form{width:100%;}
        .stateConstFilter .constsearch{width:100%}
        .constituency-seat-list .constituency-list table th.hide, .constituency-seat-list .constituency-list table tbody td.hide {display: none;}
    `}
</style>
   </>
  );
}
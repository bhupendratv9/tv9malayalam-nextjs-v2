import Image from "next/image";

export default function IplStatsWidget() {
  return (
    <>
      <style>{`
.rankingwrap .rtablink{display: flex; border: 1px solid #E6E6E6; text-align: center; border-radius: 6px; overflow-x: auto; flex-wrap: nowrap; -webkit-overflow-scrolling: touch;  align-items: center;}
.rankingwrap .rtablink a {border-right: 1px solid #E6E6E6; line-height: 35px; color: #545454; font-weight: 500;flex: 0 0 auto; padding:5px 10px;}
.rankingwrap .rtablink a:last-child{ border-right:none;}
.rankingwrap .rtablink a.active{ background: #1A385D; color: #fff;}
.rankingwrap .rankingtabTable{margin-top: 20px;}
.rankingwrap .rankingtabTable table { width: 100%; margin-bottom: 20px; position: relative; border-spacing: 0; border-collapse: collapse; box-shadow: 0 .125rem .5rem rgba(93,65,212,.12); display: block;}
.rankingwrap .rankingtabTable table tbody {display: block; width: 100%; overflow-x: scroll;}
.rankingwrap .rankingtabTable table td,.rankingwrap .rankingtabTable  table th{text-align: left;padding: 8px;font-size: 14px; font-weight: 400}
.rankingwrap .rankingtabTable table tr th:first-child, .rankingwrap .rankingtabTable table tr td:first-child,.rankingwrap .rankingtabTable table tr th:nth-child(2), .rankingwrap .rankingtabTable table tr td:nth-child(2){    position: sticky;
    z-index: 0; left: 0; background: #fff;}
    .rankingwrap .rankingtabTable table tr th:nth-child(2), .rankingwrap .rankingtabTable table tr td:nth-child(2){   
    left: 40px; }
.rankingwrap .rankingtabTable table th {text-transform: uppercase; font-weight: 700; font-size:12px}
.rankingwrap .rankingtabTable table tbody tr:nth-child(2) td {background-color: #333; color: #fff;}
.rankingwrap .rankingtabTable table tr.table_header th {background-color: #2848d2;color: #fff}
.rankingwrap .rankingtabTable table tr th:first-child{border-top-left-radius: 8px}
.rankingwrap .rankingtabTable table tr th:last-child{border-top-right-radius: 8px}
.rankingwrap .rankingtabTable.orange-cap-holder table tr.table_header th {background: #ff4e00;}
.rankingwrap .rankingtabTable.purple-cap-holder table tr.table_header th {background: #623d90;}
.rankingwrap .rankingtabTable table tbody tr:nth-child(2) td a{color:#fff}
@media (min-width: 1000px){
  .rankingwrap .rtablink a{flex: 1;}
  .rankingwrap .rankingtabTable table tbody{ display: inline-table;}}
`}</style>
      <section className="common_section">
                <div className="sports_heading">
	               <h1><span>IPL </span> 2026 Orange Cap Holder (Most Runs Scorer)</h1> 
	            </div>
                <div className="rankingwrap">
  
  <div className="rtablink">
    <a className="Rtab active" href="https://www.tv9hindi.com/sports/cricket-news/series/ipl/orange-cap-holder">Orange Cap</a>
    <a className="Rtab " href="https://www.tv9hindi.com/sports/cricket-news/series/ipl/purple-cap-holder"> Purple Cap</a>
    <a className="Rtab " href="https://www.tv9hindi.com/sports/cricket-news/series/ipl/highest-batting-score">Highest Score</a>
    <a className="Rtab " href="https://www.tv9hindi.com/sports/cricket-news/series/ipl/best-batting-strike-rate">Best Strike Rate</a>
    <a className="Rtab " href="https://www.tv9hindi.com/sports/cricket-news/series/ipl/best-bowling-figures">Best Figures</a>  
  </div>
    

 <div className="rankingtab">

 <div className="rankingtabTable orange-cap-holder">
      <table>
                  <tbody><tr className="table_header">
                <th className="freeze_column">pos</th>
                <th className="freeze_column">player</th>
                <th>mat</th>
                <th>inns</th>
                <th>no</th>
                <th>runs</th>
                <th>hs</th>
                <th>avg</th>
                <th>SR</th>
                <th>30</th>
                <th>50</th>
                <th>100</th>
                <th>4s</th>
                <th>6s</th>
              </tr><tr>
                        <td className="freeze_column">1</td>
                        <td className="freeze_column"><a href="/sports/cricket-news/player-profile/vaibhav-sooryavanshi-114349">Vaibhav Sooryavanshi (RR)</a></td>
                        <td>16</td>
                        <td>16</td>
                        <td>0</td>
                        <td>776</td>
                        <td>103</td>
                        <td>48.50</td>                               
                        <td>237.3</td>
                        <td>6</td>
                        <td>5</td>
                        <td>1</td>
                        <td>63</td>
                        <td>72</td>
                    </tr><tr>
                        <td className="freeze_column">2</td>
                        <td className="freeze_column"><a href="/sports/cricket-news/player-profile/shubman-gill-66818">Shubman Gill (GT)</a></td>
                        <td>16</td>
                        <td>16</td>
                        <td>0</td>
                        <td>732</td>
                        <td>104</td>
                        <td>45.75</td>                               
                        <td>163.02</td>
                        <td>4</td>
                        <td>6</td>
                        <td>1</td>
                        <td>74</td>
                        <td>33</td>
                    </tr><tr>
                        <td className="freeze_column">3</td>
                        <td className="freeze_column"><a href="/sports/cricket-news/player-profile/sai-sudharsan-69500">Sai Sudharsan (GT)</a></td>
                        <td>17</td>
                        <td>17</td>
                        <td>1</td>
                        <td>722</td>
                        <td>100</td>
                        <td>45.13</td>                               
                        <td>157.98</td>
                        <td>0</td>
                        <td>8</td>
                        <td>1</td>
                        <td>75</td>
                        <td>30</td>
                    </tr><tr>
                        <td className="freeze_column">4</td>
                        <td className="freeze_column"><a href="/sports/cricket-news/player-profile/virat-kohli-3993">Virat Kohli (RCB)</a></td>
                        <td>16</td>
                        <td>16</td>
                        <td>4</td>
                        <td>675</td>
                        <td>105*</td>
                        <td>56.25</td>                               
                        <td>165.84</td>
                        <td>3</td>
                        <td>5</td>
                        <td>1</td>
                        <td>73</td>
                        <td>25</td>
                    </tr><tr>
                        <td className="freeze_column">5</td>
                        <td className="freeze_column"><a href="/sports/cricket-news/player-profile/heinrich-klaasen-59736">Heinrich Klaasen (SRH)</a></td>
                        <td>15</td>
                        <td>15</td>
                        <td>2</td>
                        <td>624</td>
                        <td>69</td>
                        <td>48.00</td>                               
                        <td>160</td>
                        <td>5</td>
                        <td>6</td>
                        <td>0</td>
                        <td>48</td>
                        <td>31</td>
                    </tr><tr>
                        <td className="freeze_column">6</td>
                        <td className="freeze_column"><a href="/sports/cricket-news/player-profile/ishan-kishan-64712">Ishan Kishan (SRH)</a></td>
                        <td>15</td>
                        <td>15</td>
                        <td>0</td>
                        <td>602</td>
                        <td>91</td>
                        <td>40.13</td>                               
                        <td>182.42</td>
                        <td>2</td>
                        <td>6</td>
                        <td>0</td>
                        <td>60</td>
                        <td>32</td>
                    </tr><tr>
                        <td className="freeze_column">7</td>
                        <td className="freeze_column"><a href="/sports/cricket-news/player-profile/kl-rahul-60122">KL Rahul (DC)</a></td>
                        <td>14</td>
                        <td>14</td>
                        <td>1</td>
                        <td>593</td>
                        <td>152*</td>
                        <td>45.62</td>                               
                        <td>174.41</td>
                        <td>1</td>
                        <td>5</td>
                        <td>1</td>
                        <td>56</td>
                        <td>31</td>
                    </tr><tr>
                        <td className="freeze_column">8</td>
                        <td className="freeze_column"><a href="/sports/cricket-news/player-profile/abhishek-sharma-66799">Abhishek Sharma (SRH)</a></td>
                        <td>15</td>
                        <td>15</td>
                        <td>1</td>
                        <td>563</td>
                        <td>135*</td>
                        <td>40.21</td>                               
                        <td>204.72</td>
                        <td>3</td>
                        <td>4</td>
                        <td>1</td>
                        <td>50</td>
                        <td>43</td>
                    </tr><tr>
                        <td className="freeze_column">9</td>
                        <td className="freeze_column"><a href="/sports/cricket-news/player-profile/mitchell-marsh-10094">Mitchell Marsh (LSG)</a></td>
                        <td>13</td>
                        <td>13</td>
                        <td>0</td>
                        <td>563</td>
                        <td>111</td>
                        <td>43.31</td>                               
                        <td>163.18</td>
                        <td>4</td>
                        <td>3</td>
                        <td>1</td>
                        <td>51</td>
                        <td>36</td>
                    </tr><tr>
                        <td className="freeze_column">10</td>
                        <td className="freeze_column"><a href="/sports/cricket-news/player-profile/jos-buttler-9782">Jos Buttler (GT)</a></td>
                        <td>17</td>
                        <td>17</td>
                        <td>3</td>
                        <td>526</td>
                        <td>60</td>
                        <td>37.57</td>                               
                        <td>152.46</td>
                        <td>3</td>
                        <td>4</td>
                        <td>0</td>
                        <td>51</td>
                        <td>26</td>
                    </tr><tr>
                        <td className="freeze_column">11</td>
                        <td className="freeze_column"><a href="/sports/cricket-news/player-profile/dhruv-jurel-71370">Dhruv Jurel (RR)</a></td>
                        <td>16</td>
                        <td>16</td>
                        <td>2</td>
                        <td>515</td>
                        <td>81*</td>
                        <td>36.79</td>                               
                        <td>154.65</td>
                        <td>2</td>
                        <td>6</td>
                        <td>0</td>
                        <td>47</td>
                        <td>24</td>
                    </tr><tr>
                        <td className="freeze_column">12</td>
                        <td className="freeze_column"><a href="/sports/cricket-news/player-profile/prabhsimran-singh-70222">Prabhsimran Singh (PBKS)</a></td>
                        <td>14</td>
                        <td>13</td>
                        <td>1</td>
                        <td>510</td>
                        <td>80*</td>
                        <td>42.50</td>                               
                        <td>168.87</td>
                        <td>2</td>
                        <td>6</td>
                        <td>0</td>
                        <td>55</td>
                        <td>23</td>
                    </tr><tr>
                        <td className="freeze_column">13</td>
                        <td className="freeze_column"><a href="/sports/cricket-news/player-profile/rajat-patidar-65687">Rajat Patidar (RCB)</a></td>
                        <td>15</td>
                        <td>14</td>
                        <td>2</td>
                        <td>501</td>
                        <td>93*</td>
                        <td>41.75</td>                               
                        <td>192.69</td>
                        <td>2</td>
                        <td>5</td>
                        <td>0</td>
                        <td>30</td>
                        <td>42</td>
                    </tr><tr>
                        <td className="freeze_column">14</td>
                        <td className="freeze_column"><a href="/sports/cricket-news/player-profile/shreyas-iyer-63961">Shreyas Iyer (PBKS)</a></td>
                        <td>14</td>
                        <td>13</td>
                        <td>4</td>
                        <td>498</td>
                        <td>101*</td>
                        <td>55.33</td>                               
                        <td>168.81</td>
                        <td>1</td>
                        <td>5</td>
                        <td>1</td>
                        <td>39</td>
                        <td>30</td>
                    </tr><tr>
                        <td className="freeze_column">15</td>
                        <td className="freeze_column"><a href="/sports/cricket-news/player-profile/cooper-connolly-74410">Cooper Connolly (PBKS)</a></td>
                        <td>14</td>
                        <td>13</td>
                        <td>2</td>
                        <td>491</td>
                        <td>107*</td>
                        <td>44.64</td>                               
                        <td>163.12</td>
                        <td>4</td>
                        <td>2</td>
                        <td>1</td>
                        <td>43</td>
                        <td>32</td>
                    </tr></tbody>
                  </table>
    </div>
</div>              


            </div></section>
    </>
  );
}
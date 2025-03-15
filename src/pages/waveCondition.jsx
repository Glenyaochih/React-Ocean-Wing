import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/waveCondition.scss";

const WaveSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios.get("https://ocean-wings.onrender.com/api/wave/")
      .then(response => {
        setStations(response.data.data.stations || []);
      })
      .catch(error => console.error("找不到該浪點資訊", error));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStationClick = (id) => {
    axios.get(`https://ocean-wings.onrender.com/api/wave/${id}`)
      .then(response => {
        const station = response.data.data.stations[0];
        setSelectedStation(station);
        setWeatherData(station.weatherData[0]);
      })
      .catch(error => console.error("找不到該浪點資訊", error));
  };

  const filteredStations = stations.filter(station =>
    station.StationName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      
    <section className="waveCondition container d-flex flex-column">
      {/* 搜尋區塊 */}
      <div className="searchPlace input-group mb-13 mb-sm-16 d-flex mx-auto g-3">
        <span className="input-group-text text-white me-1 iconPlace56 bg-primary-500 border-0">
          <i className="bi bi-search icon32"></i>
        </span>
        <input 
          id="searchInput" 
          className="form-control me-3 outline-none" 
          type="search" 
          placeholder="輸入浪點" 
          aria-label="search" 
          value={searchTerm} 
          onChange={handleSearch}
        />
        <span className="input-group-text text-white me-3 iconPlace40 bg-primary-500 border-0">
          <i className="bi bi-x-circle-fill icon20" onClick={() => setSearchTerm("")}></i>
        </span>
        <button className="btn btn-primary text-white iconPlace56 border-0" type="button" id="searchAdd">
          <i className="bi bi-chevron-down icon32"></i>
        </button>
      </div>

      {/* 地點清單 */}
      {filteredStations.length > 0 && (
        <div className="station-list">
          {filteredStations.map(station => (
            <div 
              key={station.id} 
              className="station-item" 
              onClick={() => handleStationClick(station)}
            >
              {station.StationName}
            </div>
          ))}
        </div>
      )}

      {/* 選擇的浪點標題 */}
      {selectedStation && (
        <h1 className="location">
          <span className="locationBg">{selectedStation.StationName}</span>
        </h1>
      )}
      {/* 日期選單:尚未完成 */}
        <div class="dateArea">
            <div class="previousBtn d-none d-sm-block mr-11">
                <a class="page-link p-4" href="#" aria-label="Previous"><i class="bi bi-chevron-left "></i></a>
            </div>
            <nav class="dateBtn" aria-label="Page navigation">
                <ul class="pagination justify-content-between align-items-center">
                    <li class="page-item"><a class="page-link active py-2 px-5 text-center" href="#" role="button">08/26<br>(一)</a></li>
                    <li class="page-item"><a class="page-link py-2 px-5 text-center" href="#" role="button">08/27<br>(二)</a></li>
                    <li class="page-item"><a class="page-link py-2 px-5 text-center" href="#" role="button">08/28<br>(三)</a></li>
                    <li class="page-item"><a class="page-link py-2 px-5 text-center" href="#" role="button">08/29<br>(四)</a></li>
                    <li class="page-item"><a class="page-link py-2 px-5 text-center" href="#" role="button">08/30<br>(五)</a></li>
                    <li class="page-item"><a class="page-link py-2 px-5 text-center" href="#" role="button">08/31<br>(六)</a></li>
                    <li class="page-item"><a class="page-link py-2 px-5 text-center" href="#" role="button">09/01<br>(日)</a></li>
                </ul>
            </nav>
            <div class="nextBtn d-none d-sm-block ml-11">
                <a class="page-link p-4" href="#" aria-label="Next">
                    <i class="bi bi-chevron-right"></i>
                </a>
            </div>
        </div>

      {/* 浪況資訊 */}
      {selectedStation && weatherData && (
        <div className="information d-flex flex-column flex-md-row-reverse">
          <div className="comment align-self-sm-stretch position-relative py-4 px-5 d-flex flex-column justify-content-between">
          <p class="fw-bold">今日評語</p>
                <div class="align-self-end">
                    <p class="fw-bold text-end">大浪怒濤</p>
                    <p>浪高與高手雲集，新手不宜</p>
                </div>
                <img class="position-absolute " src="public/image/waveIcon.png" alt="大浪怒濤">
          </div>
          <div className="coefficient d-flex flex-column">
                <div className="borderTop d-flex align-items-center justify-content-between">
                    <p>下浪時間</p>
                    <p className="fw-bold">13:00-15:00</p>
                </div>
                <div className="row g-0">
                    <div className="borderLeft col-12 col-md-6">
                        <div className="d-flex align-items-center justify-content-between">
                            <p>浪高(米)</p>
                            <p className="fw-bold">{weatherData.WaveHeight}</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <p>風向</p>
                            <i className="bi bi-cursor-fill" style="transform: rotate(45deg);"></i>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <p>風速(節)</p>
                            <p className="fw-bold">{weatherData.WindSpeed}</p>
                        </div>
                    </div>
                    <div className="borderRight col-12 col-md-6">
                        <div className="d-flex align-items-center justify-content-between">
                            <p>週期</p>
                            <p  className="fw-bold">{weatherData.WavePeriod}</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <p>海浪方向</p>
                            <i className="bi bi-cursor-fill"></i>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <p>氣溫(°C)</p>
                            <p  className="fw-bold">{weatherData.SeaTemperature}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </section>
    <div class="footerBg">
      <div class="container d-flex flex-column">
        <div class="footerHeader">
            <h2 class="fw-bold">海上之翼 Wings of the Sea</h2>
        </div>
        <div class="footerContent row flex-sm-row-reverse flex-column">
            <div class="community col-sm-4 col-12 d-flex flex-column gap-5  mb-sm-0 mb-13">
                <div class="d-sm-block d-none align-self-end">
                    <p>追蹤我們</p>
                </div>
                <div class="d-flex gap-sm-7 gap-4 align-self-sm-end align-self-start">
                    <i class="icon24 bi bi-facebook"></i>
                    <i class="icon24 bi bi-instagram"></i>
                    <i class="icon24 bi bi-twitter-x"></i>
                    <i class="icon24 bi bi-youtube"></i>
                </div>
            </div>
            <div class="webMap col-sm-8 col-12 d-flex justify-content-sm-between flex-column flex-sm-row">
                <div>
                    <p class="fw-bold mb-sm-5 mb-3">關於我們</p>
                    <div class="d-flex flex-column gy-2">
                        <p class="py-1 py-sm-2"><a href="#">關於我們</a></p>
                        <p class="py-1 py-sm-2"><a href="#">海上之翼製作組</a></p>
                        <p class="py-1 py-sm-2"><a href="#">加入海上團隊</a></p>
                        <p class="py-1 py-sm-2"><a href="#">聯絡海上之翼</a></p>
                    </div>
                </div>
                <hr class="d-sm-none">
                <div>
                    <p class="fw-bold mb-sm-5 mb-3">商品</p>
                    <div class="d-flex flex-column g-2">
                        <p class="py-1 py-sm-2"><a href="#">衝浪板</a></p>
                        <p class="py-1 py-sm-2"><a href="#">配件</a></p>
                        <p class="py-1 py-sm-2"><a href="#">周邊</a></p>
                    </div>
                </div>
                <hr class="d-sm-none">
                <div>
                    <p class="fw-bold mb-sm-5 mb-3">衝浪資訊</p>
                    <div class="d-flex flex-column g-2">
                        <p class="py-1 py-sm-2"><a href="waveCondition.html">全台浪點</a></p>
                        <p class="py-1 py-sm-2"><a href="#">沖澡地圖</a></p>
                        <p class="py-1 py-sm-2"><a href="#">衝浪板功能介紹</a></p>
                        <p class="py-1 py-sm-2"><a href="#">衝浪板配件介紹</a></p>
                        <p class="py-1 py-sm-2"><a href="#">衝浪禮儀</a></p>
                        <p class="py-1 py-sm-2"><a href="#">如何找到合適的浪</a></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="copyright d-flex flex-column flex-sm-row gap-2">
            <p>Copyright © 2024 Wings of the Sea. All rights reserved.</p>
            <div class="d-flex flex-column flex-sm-row">
                <p class="fs-8">法律聲明．隱私權政策．Cookie 使用條款．</p>
                <p class="fs-8">Cookie 可訪問性政策</p>
            </div>
        </div>
      </div>
    </div>  
  );
};

export default WaveSearch;

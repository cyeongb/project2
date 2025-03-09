 // 유튜브 API 및 자바스크립트 
      // 1. YouTube IFrame API 로드
      var tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 2. 유튜브 플레이어 변수 생성
      var player1, player2, player3;
      var videoIds = [
        "z2LcdJ-cVCM", // 첫 번째 비디오
        "8V7czbc0kxg", // 두 번째 비디오
        "UQAReYr9wko", // 세 번째 비디오
      ];

      // 3. API가 준비되면 이 함수가 호출됨
      function onYouTubeIframeAPIReady() {
        // 첫 번째 플레이어 생성
        player1 = new YT.Player("player1", {
          videoId: videoIds[0],
          playerVars: {
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            loop: 1,
            mute: 1,
            playlist: videoIds[0],
          },
          events: {
            onReady: onPlayerReady,
          },
        });

        // 두 번째 플레이어 생성
        player2 = new YT.Player("player2", {
          videoId: videoIds[1],
          playerVars: {
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            loop: 1,
            mute: 1,
            playlist: videoIds[1],
          },
        });

        // 세 번째 플레이어 생성
        player3 = new YT.Player("player3", {
          videoId: videoIds[2],
          playerVars: {
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            loop: 1,
            mute: 1,
            playlist: videoIds[2],
          },
        });
      }

      // 4. 플레이어가 준비되면 자동 재생 설정
      function onPlayerReady(event) {
        event.target.playVideo();
        checkScroll(); // 초기 스크롤 위치에 따라 비디오 재생
      }

      // 5. 스크롤 이벤트 처리
      window.addEventListener("scroll", function () {
        // 헤더 스티키 효과
        const header = document.querySelector("header");
        header.classList.toggle("sticky", window.scrollY > 0);

        // 비디오 재생 제어
        checkScroll();

        // 페이드인 애니메이션
        const fadeElements = document.querySelectorAll(".fade-in");
        fadeElements.forEach((element) => {
          const elementPosition = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          if (elementPosition < windowHeight - 100) {
            element.classList.add("active");
          }
        });
      });

      // 6. 스크롤 위치에 따라 비디오 재생 제어
      function checkScroll() {
        const videoSections = document.querySelectorAll(".video-section");
        const players = [player1, player2, player3];

        videoSections.forEach((section, index) => {
          if (!players[index]) return;

          const rect = section.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // 화면에 비디오 섹션이 보이는 경우
          if (rect.top < windowHeight / 2 && rect.bottom > windowHeight / 2) {
            players[index].playVideo();
          } else {
            players[index].pauseVideo();
          }
        });
      }

      // 7. 페이지 로드 시 초기화
      window.addEventListener("load", function () {
        // 초기 페이드인 효과 적용
        setTimeout(() => {
          const fadeElements = document.querySelectorAll(".fade-in");
          fadeElements.forEach((element) => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementPosition < windowHeight) {
              element.classList.add("active");
            }
          });
        }, 500);
      });

      // 8. 부드러운 스크롤 효과
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const targetId = this.getAttribute("href");
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop,
              behavior: "smooth",
            });
          }
        });
      });

      document.addEventListener("DOMContentLoaded", function () {
        const restaurantItems = document.querySelectorAll(".restaurant-item");

        // 두 개의 iframe 요소 선택 (동일한 클래스/ID를 가진)
        const mapFrames = document.querySelectorAll("#map-frame");

        // 현재 페이지에 실제로 존재하는 iframe 개수 확인
        console.log("발견된 iframe 개수:", mapFrames.length);

        // iframe을 포함하는 컨테이너 (애니메이션용)
        const mapContainers = document.querySelectorAll(".about-image");
        console.log("발견된 컨테이너 개수:", mapContainers.length);

        // 첫 번째 iframe이 존재하는지 확인
        const mapFrame1 = mapFrames.length > 0 ? mapFrames[0] : null;
        const mapContainer1 =
          mapContainers.length > 0 ? mapContainers[0] : null;

        // 두 번째 iframe이 존재하는지 확인
        const mapFrame2 = mapFrames.length > 1 ? mapFrames[1] : null;
        const mapContainer2 =
          mapContainers.length > 1 ? mapContainers[1] : null;

        // 존재하는 iframe의 초기 URL 저장
        let initialMapUrl1 = null;
        let initialMapUrl2 = null;

        if (mapFrame1) {
          initialMapUrl1 = mapFrame1.src || "";
          console.log("첫 번째 iframe 초기 URL:", initialMapUrl1);
        } else {
          console.error("첫 번째 iframe을 찾을 수 없습니다.");
        }

        if (mapFrame2) {
          initialMapUrl2 = mapFrame2.src || "";
          console.log("두 번째 iframe 초기 URL:", initialMapUrl2);
        } else {
          console.log("두 번째 iframe이 없거나 찾을 수 없습니다.");
        }

        // 첫 번째 아이템을 기본으로 활성화
        if (restaurantItems.length > 0) {
          restaurantItems[0].classList.add("active");
        }

        restaurantItems.forEach((item, index) => {
          item.addEventListener("click", function () {
            // 이미 활성화된 항목을 다시 클릭한 경우 무시
            if (this.classList.contains("active")) {
              return;
            }

            // 모든 항목에서 active 클래스 제거
            restaurantItems.forEach((i) => i.classList.remove("active"));

            // 클릭한 항목에 active 클래스 추가
            this.classList.add("active");

            // 지도 URL 가져오기
            const mapUrl = this.getAttribute("data-map");

            // index가 3 미만이면 첫 번째 iframe에 표시, 3 이상이면 두 번째 iframe에 표시
            if (index < 3) {
              // 첫 번째 iframe이 존재할 때만 업데이트
              if (mapFrame1 && mapContainer1) {
                updateMap(mapContainer1, mapFrame1, mapUrl);
                console.log("첫 번째 iframe에 지도 URL 변경:", mapUrl);
              } else {
                console.error(
                  "첫 번째 iframe 또는 컨테이너가 없어 지도를 업데이트할 수 없습니다."
                );
              }
            } else {
              // 두 번째 iframe이 존재할 때만 업데이트
              if (mapFrame2 && mapContainer2) {
                updateMap(mapContainer2, mapFrame2, mapUrl);
                console.log("두 번째 iframe에 지도 URL 변경:", mapUrl);
              } else if (mapFrame1 && mapContainer1) {
                // 두 번째 iframe이 없으면 첫 번째에 표시
                updateMap(mapContainer1, mapFrame1, mapUrl);
                console.log(
                  "두 번째 iframe이 없어 첫 번째에 지도 URL 변경:",
                  mapUrl
                );
              } else {
                console.error("iframe이 없어 지도를 업데이트할 수 없습니다.");
              }
            }
          });
        });

        // 지도 업데이트 함수 (애니메이션 포함)
        function updateMap(container, frame, url) {
          try {
            // 지도 변경 애니메이션 적용
            container.classList.remove("fade-in");
            container.classList.add("fade-out");

            // 애니메이션 후 지도 URL 변경
            setTimeout(() => {
              frame.src = url;

              // 페이드인 애니메이션 적용
              container.classList.remove("fade-out");
              container.classList.add("fade-in");
            }, 300);
          } catch (error) {
            console.error("지도 업데이트 중 오류 발생:", error);
          }
        }

        // 이메일보내기
        const emailBtn = document.querySelector(".email-send");
        if (emailBtn) {
          emailBtn.addEventListener("click", function (e) {
            e.preventDefault();
            const emailAddress = this.getAttribute("value");
            if (emailAddress) {
              window.location.href = `mailto:${emailAddress}`;
            }
          });
        }

        // 영상재생
        const videoContainer = document.querySelector(".about-video");
        if (videoContainer) {
          // Create video element
          const video = document.createElement("video");
          video.src = "./video/jalanyalo.mp4";
          video.width = 500;
          video.height = 400;
          video.autoplay = true;
          video.muted = true; // Most browsers require muted for autoplay
          video.loop = true;
          video.playsInline = true; // For better mobile support

          const startTime = 0; // 시작 시간(초)
          const endTime = 30; // 종료 시간 30초만 재생

          // 시간조절
          video.addEventListener("timeupdate", function () {
            if (this.currentTime >= endTime) {
              this.currentTime = startTime; // 지정된 종료 시간에 도달하면 시작 시간으로 되돌림
            }
          });

          // Append to container
          videoContainer.appendChild(video);
        }
      });
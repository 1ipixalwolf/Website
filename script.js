// Contents from highlight-nav.js
document.addEventListener("DOMContentLoaded", function () {
    const currentPage = location.pathname.split("/").pop();
    document.querySelectorAll('.nbar a').forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });
    
    // Preload click sound for better response
    const clickSound = document.getElementById("clickSound");
    if (clickSound) {
        clickSound.load();
    }
});

// Next button functionality
function handleNextClick() {
    const clickSound = document.getElementById("clickSound");
    if (clickSound) {
        // Play sound with error handling
        clickSound.play().catch(error => {
            console.log("Audio playback failed:", error);
        });
    }

    const active = document.querySelector(".nbar a.active");
    const allLinks = Array.from(document.querySelectorAll(".nbar a"));
    const currentIndex = allLinks.indexOf(active);

    if (currentIndex >= 0 && currentIndex < allLinks.length - 1) {
        window.location.href = allLinks[currentIndex + 1].getAttribute("href");
    }
}


// Contents from script.js (with a fixed typo "0vis" -> "0")
tsParticles.load({
    id: "tsparticles",
    options: {
        "fullScreen": {
            "zIndex": 1
        },
        "particles": {
            "number": {
                "value": 0  // Fixed typo here (was "0vis")
            },
            "color": {
                "value": [
                    "#00FFFC",
                    "#FC00FF",
                    "#fffc00"
                ]
            },
            "shape": {
                "type": [
                    "circle",
                    "square",
                    "triangle"
                ],
                "options": {}
            },
            "opacity": {
                "value": {
                    "min": 0,
                    "max": 1
                },
                "animation": {
                    "enable": true,
                    "speed": 2,
                    "startValue": "max",
                    "destroy": "min"
                }
            },
            "size": {
                "value": {
                    "min": 2,
                    "max": 4
                }
            },
            "links": {
                "enable": false
            },
            "life": {
                "duration": {
                    "sync": true,
                    "value": 5
                },
                "count": 1
            },
            "move": {
                "enable": true,
                "gravity": {
                    "enable": true,
                    "acceleration": 10
                },
                "speed": {
                    "min": 10,
                    "max": 20
                },
                "decay": 0.1,
                "direction": "none",
                "straight": false,
                "outModes": {
                    "default": "destroy",
                    "top": "none"
                }
            },
            "rotate": {
                "value": {
                    "min": 0,
                    "max": 360
                },
                "direction": "random",
                "move": true,
                "animation": {
                    "enable": true,
                    "speed": 60
                }
            },
            "tilt": {
                "direction": "random",
                "enable": true,
                "move": true,
                "value": {
                    "min": 0,
                    "max": 360
                },
                "animation": {
                    "enable": true,
                    "speed": 60
                }
            },
            "roll": {
                "darken": {
                    "enable": true,
                    "value": 25
                },
                "enable": true,
                "speed": {
                    "min": 15,
                    "max": 25
                }
            },
            "wobble": {
                "distance": 30,
                "enable": true,
                "move": true,
                "speed": {
                    "min": -15,
                    "max": 15
                }
            }
        },
        "emitters": {
            "life": {
                "count": 0,
                "duration": 0.1,
                "delay": 0.4
            },
            "rate": {
                "delay": 0.1,
                "quantity": 150
            },
            "size": {
                "width": 0,
                "height": 0
            }
        }
    }
});
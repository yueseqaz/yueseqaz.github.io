// anniversary.js

function initializeAnniversary() {
    function LunarDate(Year, Month, Day) {
        try {
            let solar = Lunar.fromYmdHms(Year, Month, Day, 0, 0, 0).getSolar();
            return new Date(solar.getYear(), solar.getMonth() - 1, solar.getDay());
        } catch (error) {
            return LunarDate(Year, Month, Day - 1);
        }
    }

    function daysBetween(date1, date2) {
        const oneDay = 24 * 60 * 60 * 1000;
        return Math.floor((date2 - date1) / oneDay);
    }

    function weeksAndDaysBetween(date1, date2) {
        const totalDays = daysBetween(date1, date2);
        const weeks = Math.floor(totalDays / 7);
        const days = totalDays % 7;
        return { weeks, days };
    }

    function monthsAndDaysBetween(date1, date2) {
        let years = date2.getFullYear() - date1.getFullYear();
        let months = date2.getMonth() - date1.getMonth() + years * 12;
        let days = date2.getDate() - date1.getDate();

        if (days < 0) {
            months -= 1;
            let previousMonth = new Date(date2.getFullYear(), date2.getMonth(), 0);
            days += previousMonth.getDate();
        }

        return { months, days };
    }

    function daysLeft(dateStr, isLunar) {
        const [Year, Month, Day] = dateStr.split("-").map(Number);
        let now = new Date();
        now = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let anniversaryDate;
        if (isLunar) {
            anniversaryDate = LunarDate(now.getFullYear(), Month, Day);
            if (anniversaryDate < now) {
                anniversaryDate = LunarDate(now.getFullYear() + 1, Month, Day);
            }
        } else {
            anniversaryDate = new Date(now.getFullYear(), Month - 1, Day);
            if (anniversaryDate < now) {
                anniversaryDate = new Date(now.getFullYear() + 1, Month - 1, Day);
            }
        }
        return daysBetween(now, anniversaryDate);
    }

    function totalDays(dateStr, isLunar) {
        const [Year, Month, Day] = dateStr.split("-").map(Number);
        let now = new Date();
        now = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let startDate;
        if (isLunar) {
            startDate = LunarDate(Year, Month, Day);
        } else {
            startDate = new Date(Year, Month - 1, Day);
        }
        return daysBetween(startDate, now);
    }

    function targetDate(dateStr, isLunar) {
        const [Year, Month, Day] = dateStr.split("-").map(Number);
        let now = new Date();
        now = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let anniversaryDate;
        if (isLunar) {
            anniversaryDate = LunarDate(now.getFullYear(), Month, Day);
            if (anniversaryDate < now) {
                anniversaryDate = LunarDate(now.getFullYear() + 1, Month, Day);
            }
        } else {
            anniversaryDate = new Date(now.getFullYear(), Month - 1, Day);
            if (anniversaryDate < now) {
                anniversaryDate = new Date(now.getFullYear() + 1, Month - 1, Day);
            }
        }
        const weekDay = anniversaryDate.toLocaleDateString('zh-CN', { weekday: 'long' });
        const year = anniversaryDate.getFullYear();
        const month = (anniversaryDate.getMonth() + 1).toString().padStart(2, '0');
        const day = anniversaryDate.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day} (${weekDay})`;
    }

    function targetOrStartDate(dateStr, isLunar, displayMode) {
        if (displayMode === "elapsed") {
            return dateStr;
        } else {
            return targetDate(dateStr, isLunar);
        }
    }

    const countdownElements = document.querySelectorAll(".countdown");

    countdownElements.forEach(function (elem) {
        const dateStr = elem.getAttribute("data-date");
        const isLunar = elem.hasAttribute("data-lunar");
        const displayMode = elem.getAttribute("data-display-mode");
        if (displayMode === "elapsed") {
            elem.dataset.displayState = '0';
            updateElapsedDisplay(elem, dateStr, isLunar, 0);
            elem.addEventListener('click', function () {
                let currentState = parseInt(elem.dataset.displayState);
                currentState = (currentState + 1) % 3;
                elem.dataset.displayState = currentState.toString();
                updateElapsedDisplay(elem, dateStr, isLunar, currentState);
            });
        } else {
            let daysText = daysLeft(dateStr, isLunar);
            elem.textContent = daysText;
            elem.nextElementSibling.textContent = "天后";
        }
    });

    function updateElapsedDisplay(elem, dateStr, isLunar, displayState) {
        if (displayState === 0) {
            let days = totalDays(dateStr, isLunar);
            elem.textContent = days;
            elem.nextElementSibling.textContent = "天前";
        } else if (displayState === 1) {
            const [Year, Month, Day] = dateStr.split("-").map(Number);
            let now = new Date();
            now = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            let startDate;
            if (isLunar) {
                startDate = LunarDate(Year, Month, Day);
            } else {
                startDate = new Date(Year, Month - 1, Day);
            }

            let { weeks, days } = weeksAndDaysBetween(startDate, now);
            if (days === 0) {
                elem.textContent = weeks;
                elem.nextElementSibling.textContent = "周前";
            } else {
                elem.textContent = `${weeks}周${days}天`;
                elem.nextElementSibling.textContent = "前";
            }
        } else if (displayState === 2) {
            const [Year, Month, Day] = dateStr.split("-").map(Number);
            let now = new Date();
            now = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            let startDate;
            if (isLunar) {
                startDate = LunarDate(Year, Month, Day);
            } else {
                startDate = new Date(Year, Month - 1, Day);
            }

            let { months, days } = monthsAndDaysBetween(startDate, now);
            elem.textContent = `${months}个月${days}天`;
            elem.nextElementSibling.textContent = "后";
        }
    }

    const targetDateElements = document.querySelectorAll(".target-date");
    targetDateElements.forEach(function (elem) {
        const dateStr = elem.getAttribute("data-date");
        const isLunar = elem.hasAttribute("data-lunar");
        const displayMode = elem.getAttribute("data-display-mode");
        elem.textContent = targetOrStartDate(dateStr, isLunar, displayMode);
    });
}

document.addEventListener("DOMContentLoaded", initializeAnniversary);

document.addEventListener("pjax:complete", initializeAnniversary);
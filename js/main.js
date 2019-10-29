let galleryImages = document.querySelectorAll('.gallery-img'); //抓出來是陣列 Array
let getLatestOpenImage;
let windowWidth = window.innerWidth; //抓出瀏覽器 Width

if (galleryImages) {
    galleryImages.forEach(function (image, index) {
        image.onclick = function () {
            let getElementCss = window.getComputedStyle(image); //抓出目前圖片的Css 
            let getFullImageUrl = getElementCss.getPropertyValue('background-image'); // 抓出css 裡面指定的屬性 background-img 會得出 url
            let getImgUrlPos = getFullImageUrl.split('/img/thumb/'); //分開URL 用指定的區段分成2段 抓出我們要的
            let setNewImgUrl = getImgUrlPos[1].replace('")', ''); // 抓出來 後面有 ") 然後去除掉
           

            getLatestOpenImage = index + 1; // 因為這裡圖片命名是由1 ex.img1.jpg 開始的，所以要讓Array 裡的index +1以符合排序


            let container = document.body; //body要放入新的 window 

            let newImgWindow = document.createElement('div'); //創造出新的div
            newImgWindow.setAttribute('class', 'img-window'); //加入 class 在div
            newImgWindow.setAttribute('onclick', 'closeImg()'); // 加入 onclick 在div

            let newImg = document.createElement('img'); //創造出 img
            newImg.setAttribute('src', 'img/' + setNewImgUrl); // 在img加入src
            newImg.setAttribute('id', 'currentImg'); // 在img加入id 用來區別
            newImgWindow.appendChild(newImg); //加入在 div

            container.appendChild(newImgWindow); // div加入進去body

            //要先確保 圖片已經載入之後，再運行創建按鈕
            //不然按鈕無法先測量圖片的寬度，會影響按鈕出現位置

            newImg.onload = function () {

                let imgWidth = this.width; //抓出目前圖片寬度
                let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 90; // 計算 瀏覽器 減掉 圖片的單邊寬度 做出一點小間隔差80px

                //創造出下一張 上一張按鈕//
                //下一張//
                let newNextBtn = document.createElement('a');
                let newNextText = document.createTextNode('下一張');
                newNextBtn.setAttribute('class', 'img-btn-next');
                newNextBtn.setAttribute('onclick', 'changeImg(1)'); //加入 1 在changeImg()以判斷
                newNextBtn.appendChild(newNextText);
                container.appendChild(newNextBtn);

                newNextBtn.style.cssText = 'right:' + calcImgToEdge + 'px';

                //上一張//
                let newPrevBtn = document.createElement('a');
                let newPrevText = document.createTextNode('上一張');
                newPrevBtn.setAttribute('class', 'img-btn-prev');
                newPrevBtn.setAttribute('onclick', 'changeImg(0)'); //加入 0 在changeImg()以判斷
                newPrevBtn.appendChild(newPrevText);
                container.appendChild(newPrevBtn);

                newPrevBtn.style.cssText = 'left:' + calcImgToEdge + 'px';
            }


        }
    });
}

function closeImg() {
    document.querySelector('.img-window').remove();
    document.querySelector('.img-btn-next').remove();
    document.querySelector('.img-btn-prev').remove();
}


function changeImg(changeDir) {
    document.querySelector('#currentImg').remove();// 先刪掉之前圖片
    let getImgWindow = document.querySelector('.img-window');
    let newImg = document.createElement('img');//創造新圖片
    getImgWindow.appendChild(newImg);//加入圖片

    let calcNewImg;

    if (changeDir === 1) {
        calcNewImg = getLatestOpenImage + 1; //下一張照片index
        if (calcNewImg > galleryImages.length) {
            calcNewImg = 1;
        }
    } else if (changeDir === 0) {
        calcNewImg = getLatestOpenImage - 1; //上一張照片
    }
    if (calcNewImg < 1) {
        calcNewImg = galleryImages.length
    }

    newImg.setAttribute('src', 'img/img' + calcNewImg + '.jpg'); //換上新的圖片
    newImg.setAttribute('id', 'currentImg'); //之前刪掉的要在加上去 不然會錯誤
    getLatestOpenImage = calcNewImg;

    //要先確保 圖片已經載入之後，再運行創建按鈕
    //不然按鈕無法先測量圖片的寬度，會影響按鈕出現位置
    newImg.onload = function () {
        let imgWidth = this.width; //抓出目前圖片寬度
        let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80; // 計算 瀏覽器 減掉 圖片的單邊寬度 做出一點小間隔差80px

        let nextbtn = document.querySelector('.img-btn-next');
        nextbtn.style.cssText = 'right:' + calcImgToEdge + 'px';

        let prevbtn = document.querySelector('.img-btn-prev');
        prevbtn.style.cssText = 'left:' + calcImgToEdge + 'px';
    }
}
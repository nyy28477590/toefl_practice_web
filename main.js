var rand = 0;


function ShowMeDate() {
    　var Today=new Date();
    　alert("今天日期是 " + Today.getFullYear()+ " 年 " + (Today.getMonth()+1) + " 月 " + Today.getDate() + " 日");
    }

function getQestion() {
    var buttonText = $('.js-showHint').text();
    if (buttonText == "隱藏提示") {
        $('.js-update').show();
    };
    

    const url='https://script.google.com/macros/s/AKfycby-rGKvSORTpOIllV3Mhn_5YbQ2fO7GMkB-dDyEiibp4LeFtkvx9hHpTLgteC_IEUPq/exec'
    fetch(url, {method:'GET'})
    .then(res => {
        return res.text();
    }).then(result => {
        var ques = JSON.parse(result);
        //隨機抽題目
        rand = Math.floor(Math.random()*ques.data.length)+1;
        var date = ques.data[rand][0];
        var time = new Date(date);

        $('.question-date').text(time.toISOString().substring(0, 10));
        $('.question-name').text(ques.data[rand][1]);
        $('.js-textarea').text(ques.data[rand][2]);
    });
};

function showQestion(){
    console.log('開始');
    var text = getQestion();
    console.log('結束');
};

function updateHint(){
    var msg = "更新會覆蓋原本的紀錄，您確定要更新嗎？";
    if (confirm(msg)==true){
        var update = $('.js-textarea').val();
        var newUpdate = update.replace('\n','%0D%0A')
        var newRand = rand+1
        const update_url = 'https://script.google.com/macros/s/AKfycby-rGKvSORTpOIllV3Mhn_5YbQ2fO7GMkB-dDyEiibp4LeFtkvx9hHpTLgteC_IEUPq/exec?row=' + newRand + '&ans=' + newUpdate;
        console.log(update_url);
        fetch(update_url, {
            method:'POST',
            body:encodeURI(JSON.stringify({
                row:3,
                ans:"HiHi"
            })),
            headers: {
                'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'
            }
        })
        .then(res => {
            return res.json();
        }).then(result => {
            console.log(result);
        })
    }else{
        return false;
    }

};

function showHint(){
    var buttonText = $('.js-showHint').text();
    if (buttonText == "隱藏提示") {
        $('.js-showHint').text("顯示提示");
        $('.js-textarea').hide();
        $('.js-update').hide();
    } else {
        $('.js-showHint').text("隱藏提示");
        $('.js-textarea').show();
        $('.js-update').show();
    }
    
};
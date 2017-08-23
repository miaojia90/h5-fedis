/****************************
Function:JS 滚动的代码
Add   By:major.miao
Add Date:2017-06-29
****************************/
// var ScrollModal = {
//         getElement: function(element) {
//             return document.getElementById(element);
//         },
//         moveDown: function() {
//             var main_id = ScrollModal.getElement("main_id");
//             var content_one_id = ScrollModal.getElement("content_one_id");
//             var content_two_id = ScrollModal.getElement("content_two_id");
//             if (content_one_id.offsetTop - main_id.scrollTop >= 0)
//                 main_id.scrollTop += content_two_id.offsetHeight;
//             else {
//                 main_id.scrollTop--;
//             };
//         }
//     }
// var MyScroll = setInterval(ScrollModal.moveDown, 2);

//数据操作模块
var DataOperatModel = {
        groupId: null,
        chatMessageArry: null,
        account: 0,
        msgSeq: "",
        getGroupId: function(type) {
            var method = 'get-group-id',
                params = 'jsonString={"id":"262"}';
            H5.getDataGetApi(method, params, function(data) {
                var dataResult = data;
                DataOperatModel.groupId = dataResult.groupId ? dataResult.groupId : '';
                if (!DataOperatModel.groupId) {
                    return;
                }
                if (type == 2) {
                    DataOperatModel.getChatMessage(DataOperatModel.groupId, 40);
                } else {
                    DataOperatModel.getChatMessage(DataOperatModel.groupId, 100);
                }
            });
        },
        getChatMessage: function(groupId, msgCount) {
            var method = 'chat-message',
                params = 'jsonString={"groupId":"' + groupId + '","msgSeq":"' + DataOperatModel.msgSeq + '","msgCount":"' + msgCount + '"}';
            H5.getDataGetApi(method, params, function(data) {
                var dataResult = data;
                if (dataResult) {
                    var accountResult=0;
                    $.each(dataResult, function(indexTemp, itemObj) {
                        var flag=false;
                        $.each(DataOperatModel.chatMessageArry, function(index1, item1) {
                            if ($.trim(itemObj.msgSeq) == item1) {
                                flag=true;
                            }else{
                                flag=false;
                            }
                        });
                        if(!flag){
                           accountResult++; 
                        }
                    });
                    console.log(accountResult);
                    //渲染页面数据
                    var x = 1;
                    $.each(dataResult, function(index, item) {
                        if (DataOperatModel.checkIsRepeatChat(item.msgSeq)) {
                            DataOperatModel.msgSeq = item.msgSeq;
                            (function(itemObj) {
                                if(accountResult>10){
                                    setTimeout(function() {
                                        DataOperatModel.renderData(itemObj);
                                    }, x * 50);
                                }else{
                                    setTimeout(function() {
                                        DataOperatModel.renderData(itemObj);
                                    }, x * 700);
                                }
                            })(item);
                            x++;
                        }
                    });

                }
            });
        },
        //检查是否有重复的聊天信息
        checkIsRepeatChat: function(chatId) {
            if (!DataOperatModel.chatMessageArry) {
                DataOperatModel.chatMessageArry = new Array();
                DataOperatModel.chatMessageArry.push($.trim(chatId));
                return true;
            } else {
                var flag = true;
                $.each(DataOperatModel.chatMessageArry, function(index, item) {
                    if ($.trim(chatId) == item) {
                        flag = false;
                        return false;
                    }
                });
                if (flag) {
                    DataOperatModel.chatMessageArry.push($.trim(chatId));
                    return true;
                } else {
                    return false;
                }
            }
        },
        renderData: function(chatMessage) {
            var sb = new StringBuilder();
            sb.append("<li><div class='list-content'><div class='img-div'>");
            sb.append("<img src='" + (chatMessage.headPic == "" ? "img/default_img_1.png" : chatMessage.headPic) + "' /></div><div class='content-info-div'><p class='base'>");
            sb.append("<span class='phone'>" + chatMessage.nickName + "</span>");
            sb.append("<span class='date'>" + H5.formatDate(chatMessage.sendTime) + "</span></p>");
            sb.append("<p class='comment'>" + chatMessage.msg + "</p>");
            sb.append("</div></div></li>");
            $(".chat-message li:first").before(sb.toString());
        }
    }
    //调用事件
$(function() {
    DataOperatModel.getGroupId(1);
    setInterval(function() {
        DataOperatModel.getGroupId(2);
    }, 2000);
});

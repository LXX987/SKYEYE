//保持登录
var $ouser_showName = $('#user_showName');
var $ologin_status = $('#login_status');

$(function () {
    $.ajax({
        url: "/polls/myImages/",
        type: "POST",
        data: "1223334",
        dataType: 'json',
        success: function (data) {
            // console.log(data['current_user']);
            // console.log(data['count']);
            // console.log(data['images']);

            var current_uer = data['current_user'];
            var count = data['count'];
            var images = data['images'];

            if (current_uer != "") {
                // alert(current_uer)
                $('#user_showName').text(current_uer);
                $('#login_status').text("退出登录！")
            } else {
                $ouser_showName.text("游客");
                $ologin_status.text("请先登录")
            }

            // for(var i=0; i<images.length; i++){
            //     console.log(images[i]['image_id'])
            // }

            //填充图片列表部分
            var $oResultBox = $('#resultBox');
            $('#paging').paging({
                nowPage: 1,
                allPages: Math.ceil(count / 6),
                displayPage: 7,
                callBack: function (now) {
                    var currentPages = now * 6 < images.length ? 6 : images.length - (now - 1) * 6;
                    $oResultBox.html('');

                    for (var i = 0; i < currentPages; i++) {
                        var num = (now - 1) * 6 + i;
                        var create_dl = $('<dl></dl>');
                        var _html = '<dt>' +
                            '<img class="show_image" src="http://127.0.0.1:8000/static/Data/input/' + images[num]['image_name'] + '">' +
                            '<img class="show_image" src="http://127.0.0.1:8000/static/Data/finalOutput/' + images[num]['image_name'] + '">' +
                            '</dt>' +
                            '<dd>' +
                            '<a class="image_name">图片名称:' + images[num]['image_name'] + '</a>' +
                            '<a class="image_publisher">发布者：' + images[num]['image_publisher'] + '</a>' +
                            '</dd>' +
                            '<button value="' + images[num]['image_name'] + '" class="todetails" onclick="getDetails(\'' + images[num]['image_id'] + '\')">详情</button>';
                        create_dl.html(_html).addClass('bounceIn animated');
                        $oResultBox.append(create_dl);
                    }
                }
            });
        }
    })
});


function getDetails(key) {
    alert(key)
    console.log(key)
    var data = JSON.stringify({
        'image_name': key,
    });
    // alert(data)
    $.ajax({
        url: "/polls/Detail/",
        type: "POST",
        data: data,
        dataType: 'json',
        success: function (data) {
            // alert(user)
            if (data == "1") {
                window.location.href = "http://127.0.0.1:8000/polls/toImageDetail/";
            } else {
                alert("数据载入失败！")
            }
        }
    })
}


;(function ($, window, document, undefined) {
    var Paging = function (elem, options) {
        var self = this;
        this.$oPaging = elem;
        this.$oFirst = this.$oPaging.find('.first');
        this.$oLast = this.$oPaging.find('.last');
        this.$oPrev = this.$oPaging.find('.prev');
        this.$oNext = this.$oPaging.find('.next');
        this.$oList = this.$oPaging.find('.list');
        this.$aItem = this.$oList.find('li');
        this.$oGo = this.$oPaging.find('.go');
        this.$oGo_text = this.$oGo.find('input');
        this.$oGo_btn = this.$oGo.find('button');

        this.defaults = {
            nowPage: 1,
            allPages: 10,
            displayPage: 5
        };

        this.opts = $.extend({}, this.defaults, options);

        this.nowPage = this.opts.nowPage;
        this.allPages = this.opts.allPages;
        this.displayPage = this.opts.displayPage > this.allPages
            ? this.opts.displayPage = this.allPages
            : this.opts.displayPage;
        this.iNum = this.nowPage;
        this.min_halfPage = Math.floor(this.displayPage / 2);
        this.big_halfPage = Math.ceil(this.displayPage / 2);
    };

    Paging.prototype = {
        clickFn: function () {
            this.cleanClassName();
            this.setPaging(this.iNum);
            this.detectionPage(this.iNum);

            this.opts.callBack && this.opts.callBack(this.iNum);
        },

        cleanClassName: function () {
            this.$aItem.removeClass('cur');
        },

        detectionPage: function (currentPage) {
            if (currentPage >= this.big_halfPage + 1) {
                this.$oFirst.removeClass('disable');
            } else {
                this.$oFirst.addClass('disable');
            }

            if ((this.allPages - currentPage) >= this.big_halfPage) {
                this.$oLast.removeClass('disable');
            } else {
                this.$oLast.addClass('disable');
            }

            if (currentPage > 1) {
                this.$oPrev.removeClass('disable');
            } else {
                this.$oPrev.addClass('disable');
            }

            if (currentPage < this.allPages) {
                this.$oNext.removeClass('disable');
            } else {
                this.$oNext.addClass('disable');
            }
        },

        setPaging: function (currentPage) {
            this.$aItem = this.$oList.find('li');

            for (var i = 1; i <= this.displayPage; i++) {
                if (currentPage <= this.min_halfPage) {
                    this.$aItem.eq(i - 1).text(i).attr('index', '#' + i);

                    for (var j = 1; j <= this.min_halfPage; j++) {
                        if (currentPage === j && i === j) {
                            this.$aItem.eq(i - 1).addClass('cur');
                        }
                    }
                } else if ((this.allPages - currentPage) < this.min_halfPage) {
                    var nowNum = this.allPages - this.displayPage + i;

                    this.$aItem.eq(i - 1).text(nowNum).attr('index', '#' + nowNum);

                    for (var j = 0; j < this.min_halfPage; j++) {
                        if ((this.allPages - currentPage) === j && i === this.displayPage - j) {
                            this.$aItem.eq(i - 1).addClass('cur');
                        }
                    }
                } else {
                    var nowNum = currentPage - this.big_halfPage + i;

                    if (i === this.big_halfPage) {
                        this.$aItem.eq(i - 1).addClass('cur');
                    }

                    this.$aItem.eq(i - 1).text(nowNum).attr('index', '#' + nowNum);
                }
            }
        },

        initalPaging: function () {
            for (var i = 1; i <= this.displayPage; i++) {
                var $create_li = $('<li></li>');

                $create_li.text(i).attr('index', '#' + i);

                this.$oList.append($create_li);
            }

            if (this.allPages <= this.displayPage) {
                this.$aItem.eq(this.nowPage - 1).addClass('cur');
            } else {
                this.$oGo.css({display: 'inline-block'});
                this.$oGo_text.attr('placeholder', 'Total: ' + this.allPages);
            }

            this.setPaging(this.nowPage);
            this.detectionPage(this.nowPage);
        },

        inital: function () {
            var self = this;

            this.initalPaging();
            this.opts.callBack && this.opts.callBack(this.iNum);

            this.$aItem.click(function () {
                if (!$(this).hasClass('cur')) {
                    self.iNum = parseInt($(this).attr('index').substring(1));

                    self.clickFn();
                }
            });

            this.$oFirst.click(function () {
                if (!$(this).hasClass('disable')) {
                    self.iNum = 1;

                    self.clickFn();
                }
            });

            this.$oLast.click(function () {
                if (!$(this).hasClass('disable')) {
                    self.iNum = self.allPages;

                    self.clickFn();
                }
            });

            this.$oPrev.click(function () {
                if (!$(this).hasClass('disable')) {
                    self.iNum--;

                    self.clickFn();
                }
            });

            this.$oNext.click(function () {
                if (!$(this).hasClass('disable')) {
                    self.iNum++;

                    self.clickFn();
                }
            });

            this.$oGo_btn.click(function () {
                var value = self.$oGo_text.val();
                var reg = new RegExp(/^[0-9]*[1-9][0-9]*$/);

                if (value !== '' && reg.test(value) && value <= self.allPages) {
                    self.iNum = parseInt(value);

                    self.clickFn();

                    self.$oGo_text.val('')
                } else {
                    self.$oGo_text.val('')
                }
            });
        },

        constructor: Paging
    };

    $.fn.paging = function (options) {
        var paging = new Paging(this, options);

        return paging.inital();
    };

})
(jQuery, window, document, undefined);
export const helpers = {
    //hàm chuyển đổi định dạng ngày giờ từ javascript sang c#
    formatDateJSToServer: function (date) {
      try {
        return (
          "/Date(" + (date.getTime() - date.getTimezoneOffset() * 60000) + ")/"
        );
      } catch (err) {
        return null;
      }
    },
  
    //convert datetime format C# to javascript (YYYY-MM-DD)
    formatDateServerToJS: function (str) {
      try {
        var temp = str.replace(/[^0-9+ ]/g, "");
        var arr = temp.split("+");
        var t = new Date(Number(arr[0]));
        return t;
        
      } catch (err) {
        return null;
      }
    }
  };
  
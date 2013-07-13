Date.prototype.AddDays = function (days) {

    this.setDate(this.getDate() + days);
    return this;
};

Date.prototype.Format_MDY = function () {
     return  this.getMonth() + 1 + "/" + this.getDate() + "/" + this.getFullYear(); 
};

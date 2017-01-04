const Promise = function (callback) {
	let pending = [], rejection = [];
	let tryCallback;
	let that = this;

  this.status = 'Pending';
	var resolve = function (result) {
		that.value = result;
    if (that.status === 'Pending' && that.value) {
      that.status = dealResolve() ? 'Fulfilled': 'Pending';
    }
	};
  var reject = function(err) {
    that.err = err;
    if (that.status === 'Pending' && that.err) {
      that.status = dealReject() ? 'Rejected': 'Pending';
    }
  };
  var dealResolve = function () {
    var i = 0;
    var length = pending.length;
    for (; i < length; i ++) {
			var tempValue  = pending[i].call(that, that.value);
			that.value = tempValue ? tempValue : that.value;
		}
    return length > 0;
  };
	var dealReject = function () {
		if (catchCallback) {
			catchCallback.call(that, that.err);
      return true;
		} else {
      var i = 0;
      var length = rejection.length;
			for (;i < length; i ++) {
				var tempError  = rejection[i].call(this, that.err);
				that.err = tempError ? tempError : that.err;
			}
      return length > 0;
		}
	};
	this.then = function (resolveCallback, rejectCallback) {
		if (resolveCallback) {
			pending.push(resolveCallback);
		}

		if (rejectCallback) {
			rejection.push(rejectCallback);
		}

    if (that.status == 'Pending' && that.err) {
      that.status = dealReject() ? 'Rejected' : 'Pending';
    }

    if (that.status == 'Pending' && that.value) {
      that.status = dealResolve() ? 'Fulfilled' : 'Pending';
    }
		return this;
	};
	this.catch = function(callback) {
		catchCallback = callback;
    if (that.status == 'Pending' && that.err) {
      that.status = dealReject() ? 'Rejected' : 'Pending';
    }
		return this;
	};
  callback(resolve, reject);
};

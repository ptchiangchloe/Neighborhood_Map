var brands = markers;
var markersArray = [];
// console.log(brands);

var viewModel = {
    brands: ko.observableArray([]),
    addBrand: function() {
      for(var i=0; i< brands.length; i++){
        this.brands.push(brands[i]);
      }
    },
    query: ko.observable(''),
    search: function(val) {
      // console.log("Before removeAll: ", viewModel.brands.length, brands.length)
    viewModel.brands.removeAll();
    for(var i = 0; i < markersArray.length; i++){
      markersArray[i].setVisible(false);
    }
    // console.log("After removeAll: ", viewModel.brands.length, brands.length)
    for(var i = 0; i < brands.length; i++) {
      if(brands[i].name.toLowerCase().indexOf(val.toLowerCase()) >= 0) {
        viewModel.brands.push(brands[i]);
        markersArray[i].setVisible(true);
      }
    }
  },
  displayBox: function(brand){
    // console.log(brand);
    google.maps.event.trigger(markersArray[brand.markerId], 'click');
  }
};

ko.applyBindings(viewModel);
viewModel.addBrand();
// console.log("addBrand: ", viewModel.brands.length, brands.length)
viewModel.query.subscribe(viewModel.search);

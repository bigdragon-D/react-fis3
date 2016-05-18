'use strict';

export function formatData (data){
	if(typeof data === 'string'){
		let obj=null;
		fetch(data).then((response) => response.json()).then(res => {
			if(res.state === 1){
				obj = res
			}
		}).done()
		return obj;
	}else {
		return getArray(data);
	}
}

function getArray (arr){
	if(!arr){
		return [];
	}
	arr = arr.map(function(item){
		if(typeof item !== 'object'){
			return {text :item, value:item}
		}else{
			return item
		}
	})
	return arr;
}


export function contain(arr,item){
	if(!arr instanceof Array){
		return false
	}
	for(let v of arr){
		return  v === item?true:false;
	}
};

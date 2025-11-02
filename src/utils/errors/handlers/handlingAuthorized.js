export function validateCheckbox(newData, isChecked, setCheckColor){
    if(!isChecked){
        setCheckColor("text-red-500")
        return newData.isValid = false 
    }else{
        setCheckColor("text-slate-500")
        newData["authorizedTerms"] = true
        return newData
    }
}
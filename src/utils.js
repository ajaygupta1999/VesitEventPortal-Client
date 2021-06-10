


// Function for adding class-wise Registrations on event object ===
export const addClassWiseReg = (allEvents) => {

    let allUpdatedEvents = [];

    // All branch processing ===
    for(var i = 0 ; i < allEvents.length; i++){
        let eventobj = {
            ...allEvents[i]
        };

        let classArray = [];

        // For checking of classObj array checking and Branch array checking ==
        for(var j = 0; j < allEvents[i].registrations.length; j++){
            var count = 0;
            for(var k = 0 ; k < classArray.length ; k++){
                if(classArray[k].class === allEvents[i].registrations[j].classdetails.class){
                    classArray[k].reg = classArray[k].reg + 1;
                    break;
                }else{
                    count++;
                }
            }

            if(count === classArray.length){
                let newClass = {
                    class : allEvents[i].registrations[j].classdetails.class,
                    reg : 1
                }
                classArray.push(newClass);
            }

        }

        eventobj.classWiseReg = classArray;
        allUpdatedEvents.push(eventobj);
    }

    return allUpdatedEvents;
}



// Function for branch-wise registration on event object == 
export const addBranchWiseReg = (allEvents) => {

    let allUpdatedEvents = [];
    // All branch processing ===
    for(var i = 0 ; i < allEvents.length; i++){
        let eventobj = {
            ...allEvents[i]
        };

        let branchArray = [];
        // For checking of classObj array checking and Branch array checking ==
        for(var j = 0; j < allEvents[i].registrations.length; j++){
            // For checking of classObj array checking and Branch array checking ==
            var count = 0;

            for(var p = 0; p < branchArray.length ; p++){
                if(branchArray[p].branch === allEvents[i].registrations[j].classdetails.department){
                    branchArray[p].reg = branchArray[p].reg + 1;
                    break;
                }else{
                    count++;
                }
            }
            
            if(count === branchArray.length){
                let newBranch = {
                    branch : allEvents[i].registrations[j].classdetails.department,
                    reg : 1
                }
                branchArray.push(newBranch);
            }
        }

        eventobj.branchWiseReg = branchArray;
        allUpdatedEvents.push(eventobj);
    }

    return allUpdatedEvents;
}





// Random color generator ===
export const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

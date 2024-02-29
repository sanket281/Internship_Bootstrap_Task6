$(document).ready(function(){

    // Code to add and remove extra education field
    $('#extraField').on('click',function(event){
        event.preventDefault();
        const cloned = $('#extraRow').clone(true); // cloning the row
        cloned.find('input[type="text"], input[type="date"]').val('');
        cloned.addClass('removeAnyTime');
        const clonedButton = cloned.find('.removeField');
        clonedButton.css('display','block');
        $('#inputFields').append(cloned);
        cloned.css('opacity','1');
    })
    $(document).on('click','.removeField, span', function(event){
        event.preventDefault();
        $(this).closest('.education').remove();
    })


    let storedData = [];
    let submit = true;
    $('#submitForm').on('submit',function(event){
        event.preventDefault();

        // Check if the form is for adding or editing
        const isEditing = $(this).hasClass('editing-mode');

        if (!isEditing) {
            // Handle form submission for adding new entries
            handleFormSubmitForAdding(event);
        } else {
            // Handle form submission for editing existing entries
            handleFormSubmitForEditing(event);
        }
    });

    function handleFormSubmitForAdding(event){
        event.preventDefault();
     
        const educationData = [];
        const educationInputs = $('.educationForm');
        
        educationInputs.each(function(index){
            
            const educationItem = {
                degree: $(this).find('input[name="degree"]').val(),
                school: $(this).find('input[name="school"]').val(),
                startDate: $(this).find('input[name="startDate"]').val(),
                passoutYear: $(this).find('input[name="passoutYear"]').val(),
                percentage: $(this).find('input[name="percentage"]').val(),
                backlog: $(this).find('input[name="backlog"]').val()
            }
            educationData.push(educationItem);
        })

        const formData = {
            firstName: $('.firstName').val(),
            lastName: $('.lastName').val(),
            dob: $('.dob').val(),
            email: $('.email').val(),
            address: $('.address').val(),
            graduateYear: $('.graduateYear').val(),
            education: educationData,
        }

        if(submit===true)
        {
            storedData.push(formData);
            console.log(storedData);
    
            //Refresh DataTable with updated data
            $('#myTable').DataTable().clear().rows.add(storedData).draw();
        }
        else{
            alert('Fill all the details correctly')
            return;
        }
        
        //dont submit the form if the functionality are not finished
        let empty = false;
        
        $('input[required]').each(function() {
            if ($(this).val().trim() === "") {
                empty = true;
                return false; // Exit the loop early if an empty input is found
            }
        });
        if (empty) {
            alert("Please fill out all the required fields");
        }
        
        
        $('.removeAnyTime').remove();
        // Close the Bootstrap modal using jQuery
        $('#exampleModal').modal('hide');        
        
    }

    var rowIndex;
    // Handle edit button click
    $('#myTable').on('click', '.edit-button', function() {
        $('#submitForm').addClass("editing-mode");
        rowIndex = table.row($(this).parents('tr')).index();
        
        // Retrieve the data for the corresponding row from the storedData array
        var rowData = storedData[rowIndex];
        console.log('Edit button clicked for row:', rowData);
        $('.removeAnyTime').remove();
        
        // Populate form fields with the data of the clicked row
        $('input[name="firstName"]').val(rowData.firstName);
        $('input[name="lastName"]').val(rowData.lastName);
        $('input[name="dob"]').val(rowData.dob);
        $('input[name="email"]').val(rowData.email);
        $('input[name="address"]').val(rowData.address);
        $('input[name="graduateYear"]').val(rowData.graduateYear);

        if (rowData.education.length > 2) {
            for (var j = 2; j < rowData.education.length; j++) {
                const cloned = $('#extraRow').clone(true); // cloning the row
                cloned.find('input[type="text"], input[type="date"]').val('');
                cloned.addClass('removeAnyTime');
                const clonedButton = cloned.find('.removeField');
                clonedButton.css('display','block');
                $('#inputFields').append(cloned);
                cloned.css('opacity','1');
            }
        }

            // Populate education input data fields
            for (var i = 0; i < rowData.education.length; i++) {
                var educationItem = rowData.education[i];   
                $('.degree').eq(i).val(educationItem.degree);
                $('.school').eq(i).val(educationItem.school);
                $('.startDate').eq(i).val(educationItem.startDate);
                $('.passoutYear').eq(i).val(educationItem.passoutYear);
                $('.percentage').eq(i).val(educationItem.percentage);
                $('.backlog').eq(i).val(educationItem.backlog);   
            }
            

        // Show the edit modal
        $('#editModal').modal('show');
    });

    var rowDelete;
    // Handle delete button click
    $('#myTable').on('click', '.delete-button', function() {
        // Ask for confirmation before deleting
        rowDelete = table.row($(this).parents('tr')).index();
        const confirmation = confirm('Are you sure you want to delete this entry?');
        console.log(confirmation)
        if (confirmation) {
            storedData.splice(rowDelete, 1);
            //Refresh DataTable with updated data
            console.log(storedData);
            $('#myTable').DataTable().clear().rows.add(storedData).draw();
        }
        
    });

    function handleFormSubmitForEditing(event){
        event.preventDefault();
        const educationData = [];
        const educationInputs = $('.educationForm');

        educationInputs.each(function(index){

            const educationItem = {
                degree: $(this).find('input[name="degree"]').val(),
                school: $(this).find('input[name="school"]').val(),
                startDate: $(this).find('input[name="startDate"]').val(),
                passoutYear: $(this).find('input[name="passoutYear"]').val(),
                percentage: $(this).find('input[name="percentage"]').val(),
                backlog: $(this).find('input[name="backlog"]').val()
            }
            educationData.push(educationItem);
        })

        const formData = {
            firstName: $('.firstName').val(),
            lastName: $('.lastName').val(),
            dob: $('.dob').val(),
            email: $('.email').val(),
            address: $('.address').val(),
            graduateYear: $('.graduateYear').val(),
            education: educationData,
        }

        // if(submit===true)
        // {
            storedData[rowIndex] = formData;
            console.log(storedData);
    
            //Refresh DataTable with updated data
            $('#myTable').DataTable().clear().rows.add(storedData).draw();
        // }
        // else{
        //     alert('Fill all the details correctly')
        //     return;
        // }

        //dont submit the form if the functionality are not finished
        let empty = false;

        $('input[required]').each(function() {
            if ($(this).val().trim() === "") {
                empty = true;
                return false; // Exit the loop early if an empty input is found
            }
        });
        if (empty) {
            alert("Please fill out all the required fields");
        }

        $('.removeAnyTime').remove();

        // Close the Bootstrap modal using jQuery
        $('#exampleModal').modal('hide');   
        
        $('#submitForm').removeClass('editing-mode');

    }

    // event listener to open education details
    $('#myTable').on('click','.edu-button',function(){

        let moreRow = table.row($(this).parents('tr')).index();

        // Retrieve the data for the corresponding row from the storedData array
        let moreData = storedData[moreRow];

        console.log('Edit button clicked for row:', moreData);

            // Destroy existing DataTable instances
            $('#personalDetail').DataTable().destroy();
            $('#educationDetail').DataTable().destroy();
        let personalDetail = $('#personalDetail');
        personalDetail.DataTable({
            data: [moreData],

            columns:[
                {data: 'firstName' , className: 'dt-center'},
                {data: 'lastName' , className: 'dt-center'},
                {data: 'dob', className: 'dt-center'},
                {data: 'email', className: 'dt-center'},
                {data: 'address', className: 'dt-center'},
                {data: 'graduateYear', className: 'dt-center'}
            ],

            "lengthChange": false, // Disable the entries per page option
            "searching": false, // Disable searching
            "ordering": false, // Disable ordering
            "info": false, // Disable the information display
            "paging": false // Disable pagination
        });
        $('#educationDetail').DataTable({
            data: moreData.education,
            columns:[
                {data: 'degree', className: 'dt-center'},
                {data: 'school', className: 'dt-center'},
                {data: 'startDate', className: 'dt-center'},
                {data: 'passoutYear', className: 'dt-center'},
                {data: 'percentage', className: 'dt-center'},
                {data: 'backlog', className: 'dt-center'}
            ],
            "lengthChange": false, // Disable the entries per page option
            "searching": false, // Disable searching
            "ordering": false, // Disable ordering
            "info": false, // Disable the information display
            "paging": false // Disable pagination
        });
    })

    var table = $('#myTable').DataTable({     
        data: storedData,
        columns:[
            {data: 'firstName', className: 'dt-center' },
            {data: 'lastName' , className: 'dt-center'},
            {data: 'dob' , className: 'dt-center'},
            {data: 'email' , className: 'dt-center'},
            {data: 'address' , className: 'dt-center'},
            {data: 'graduateYear' , className: 'dt-center'},
            {
                // For education details
                data: null,
                defaultContent: '<button class="edu-button btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">More</button>',
                targets: -1,
                className: 'dt-center'
            },
            {
                // Custom rendering for the last column with edit and delete buttons
                data: null,
                defaultContent: '<button class="edit-button btn btn-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pen-to-square" id="icon"></i></button>                      <button class="delete-button btn btn-red"><i class="fa-solid fa-trash"></i></button>',
                targets: -1,
                className: 'dt-center'
            }
        ]
    });


    // Validations

    // Create a common error span for all inputs
    let error = $('<span></span>').css('color', 'red');

    //event listener for Date of Berth field
    $('input[name="dob"]').on('change',function(){
        const dobValue = this.value;
        const dobDate = new Date(dobValue);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();

        // If the birthday hasn't occurred yet this year, subtract one year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }     
        
        // Check if the age is greater than or equal to 18
        if (age < 18 || age=='') {
            
            
            // Display an alert message indicating that the age must be 18 or older
            $(this).css({
                border : '2px solid red'
            })
            error.text("Age should be greater than 18");
            if (!$(this).parent().find('span').length) {
                $(this).parent().append(error);
            }          
             // alert('You must be at least 18 years old to submit this form.');
            // // Set a timeout to remove the error message after a certain period
            // setTimeout(() => {
            //     $(this).style.border = ''; // Reset border color
            //     $(this).parentNode.removeChild(error); // Remove the error span
            // }, 3000); // Remove the error after 3 seconds (adjust as needed)
            // return;
            submit=false; 
        }
        else
        {
            $(this).css('borderColor', '');
            $(this).parent().find('span').remove();
            submit=true;
        }

    })

    //event listner for backlog value
    $('input[name="backlog"]').each(function() {
        // Add change event listener to each backlog input
        $(this).on('change', function() {
            // Parse backlog value to integer
            var backlogValue = parseInt($(this).val());

            // Check if the backlog value is between 0 and 20
            if (backlogValue > 20 || backlogValue < 0) {
                // Display error message and set border color to red
                $(this).css('borderColor', 'red');
                error.text('Backlog value must be between 0 and 20');
                if (!$(this).parent().find('span').length) {
                    $(this).parent().append(error);
                }
                submit = false; // Set submit flag to false
            } else {
                // Remove error message and reset border color
                $(this).css('borderColor', '');
                $(this).parent().find('span').remove();
                submit = true; // Set submit flag to true
            }
        });
    });

    //event listener for passout year
    $('input[name="passoutYear"]').each(function() {
        $(this).on('change', function() {
            // Check if the passout year is greater than the start date
            var passoutYear = parseInt($(this).val()); 
            var startDate = parseInt($('input[name="startDate"]').val());

            if (passoutYear <= startDate) {
                $(this).css('borderColor', 'red');
                error.text('Passout year must be greater than the start date');
                if (!$(this).parent().find('span').length) {
                    $(this).parent().append(error);
                }
                submit = false;
            } else {
                $(this).css('borderColor', '');
                $(this).parent().find('span').remove();
                submit = true;
            }
        });
    });

    //event listener for percentage value
    $('input[name="percentage"]').each(function() {
        $(this).on('change', function() {
            // Check if the percentage value is within the valid range
            var percentageValue = parseInt($(this).val()); 

            if (percentageValue > 100 || percentageValue < 33) {
                $(this).css('borderColor', 'red');
                error.text('Percentage value must be between 33 and 100');
                if (!$(this).parent().find('span').length) {
                    $(this).parent().append(error);
                }
                submit = false;
            } else {
                $(this).css('borderColor', '');
                $(this).parent().find('span').remove();
                submit = true;
            }
        });
    });
   
  

});

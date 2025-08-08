const supabaseUrl = 'https://fevfowpytopaujvasojv.supabase.co';
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZldmZvd3B5dG9wYXVqdmFzb2p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NzU5NjUsImV4cCI6MjA3MDI1MTk2NX0.hzrDdgynfVA5U0Vl_HEpnkn7a5TT7nsydpRyKgh3PYY`;
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

let form = document.getElementById("form");

async function uploadImage() {
    let fileUpload = document.getElementById("file-upload");
    const file = fileUpload.files[0];

    const filePath = `uploads/${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
        .from("userspics")
        .upload(filePath, file);

    if (error) {
        console.error("Upload error:", error.message);
        Swal.fire({
            title: "Opps!",
            text: "Something Went Wrong!",
            icon: "error"
        });
        return;
    }

    const { data: publicUrlData } = supabase.storage
        .from("userspics")
        .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
}



function showLoader() {
    document.getElementById("loader").classList.remove("hidden");
}

function hideLoader() {
    document.getElementById("loader").classList.add("hidden");
}


let submitForm = async () => {
    showLoader();

    let country = document.getElementById("country").value;
    let city = document.getElementById("city").value;
    let course = document.getElementById("course").value;
    let computerProficiency = document.getElementById("computer_ proficiency").value;
    let fullName = document.getElementById("fullName").value;
    let fatherName = document.getElementById("fatherName").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let cnic = document.getElementById("cnic").value;
    let fatherCNIC = document.getElementById("fatherCNIC").value;
    let dateOfBirth = document.getElementById("dateOfBirth").value;
    let gender = document.getElementById("gender").value;
    let address = document.getElementById("address").value;
    let lastQualification = document.getElementById("lastQualification").value;
    let reasonToApply = document.getElementById("reasonToApply").value;

    const { error } = await supabase
        .from('forms')
        .insert({
            country,
            city,
            course,
            computer_proficiency: computerProficiency,
            fullName,
            fatherName,
            email,
            phone,
            cnic,
            fatherCNIC,
            dateOfBirth,
            gender,
            address,
            lastQualification,
            reasonToApply,
            imageURL: await uploadImage()
        })
    if (error) {
        hideLoader();
        console.log("error =>", error);
        Swal.fire({
            title: "Opps!",
            text: "Something Went Wrong!",
            icon: "error"
        });
    } else {
        hideLoader();
        Swal.fire({
            title: "Congratulations!",
            text: "Form Submitted Successfully!",
            icon: "success"
        });
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm();
    form.reset();
})
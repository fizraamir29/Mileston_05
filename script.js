document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("resumeForm");
    var generateResumeBtn = document.getElementById("generateResume");
    var resumeContent = document.getElementById("resumeContent");
    var imagePreview = document.getElementById("imagePreview");
    var shareLinkBtn = document.getElementById("shareLink");
    var downloadPDFBtn = document.getElementById("downloadPDF");
    form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (e) { return e.preventDefault(); });
    generateResumeBtn === null || generateResumeBtn === void 0 ? void 0 : generateResumeBtn.addEventListener("click", function () {
        // Validate the form and generate the resume
        var inputs = form === null || form === void 0 ? void 0 : form.querySelectorAll("input, textarea");
        var isValid = true;
        inputs.forEach(function (input) {
            if (input.type !== "file" && !input.value.trim()) {
                isValid = false;
                input.classList.add("is-invalid");
            }
            else {
                input.classList.remove("is-invalid");
            }
        });
        if (!isValid) {
            alert("Please fill in all required fields.");
            return;
        }
        var username = document.getElementById("username").value;
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var education = document.getElementById("education").value;
        var workExperience = document.getElementById("workExperience").value;
        var skills = document.getElementById("skills").value.split(",").map(function (skill) { return skill.trim(); });
        var profilePictureSrc = imagePreview.src !== "#" ? imagePreview.src : "";
        resumeContent.innerHTML = "\n            <h2>".concat(name, "</h2>\n            <p>Email: ").concat(email, "</p>\n            <p>Phone: ").concat(phone, "</p>\n            <p>Education: ").concat(education, "</p>\n            <p>Work Experience: ").concat(workExperience, "</p>\n            <p>Skills: ").concat(skills.join(", "), "</p>\n            ").concat(profilePictureSrc ? "<img src=\"".concat(profilePictureSrc, "\" alt=\"Profile Picture\" class=\"img-thumbnail\">") : "", "\n        ");
        // Generate a shareable link
        var resumeLink = "".concat(username, ".vercel.app/resume");
        document.getElementById("resumeLink").innerHTML = "Shareable Link: <a href=\"".concat(resumeLink, "\" target=\"_blank\">").concat(resumeLink, "</a>");
    });
    // Handle profile picture preview
    var profilePictureInput = document.getElementById("profilePicture");
    profilePictureInput === null || profilePictureInput === void 0 ? void 0 : profilePictureInput.addEventListener("change", function () {
        var _a;
        if ((_a = this.files) === null || _a === void 0 ? void 0 : _a.length) {
            var file = this.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });
    // Handle PDF download
    downloadPDFBtn === null || downloadPDFBtn === void 0 ? void 0 : downloadPDFBtn.addEventListener("click", function () {
        var jsPDF = window.jspdf.jsPDF;
        html2canvas(resumeContent).then(function (canvas) {
            var imgData = canvas.toDataURL('image/png');
            var pdf = new jsPDF('p', 'mm', 'a4');
            var imgWidth = 210; // A4 width in mm
            var imgHeight = canvas.height * imgWidth / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('resume.pdf');
        });
    });
});

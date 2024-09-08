document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resumeForm") as HTMLFormElement;
    const generateResumeBtn = document.getElementById("generateResume") as HTMLButtonElement;
    const resumeContent = document.getElementById("resumeContent") as HTMLDivElement;
    const imagePreview = document.getElementById("imagePreview") as HTMLImageElement;
    const shareLinkBtn = document.getElementById("shareLink") as HTMLButtonElement;
    const downloadPDFBtn = document.getElementById("downloadPDF") as HTMLButtonElement;

    form?.addEventListener("submit", (e) => e.preventDefault());

    generateResumeBtn?.addEventListener("click", () => {
        // Validate the form and generate the resume
        const inputs = form?.querySelectorAll("input, textarea") as NodeListOf<HTMLInputElement | HTMLTextAreaElement>;
        let isValid = true;

        inputs.forEach((input) => {
            if (input.type !== "file" && !input.value.trim()) {
                isValid = false;
                input.classList.add("is-invalid");
            } else {
                input.classList.remove("is-invalid");
            }
        });

        if (!isValid) {
            alert("Please fill in all required fields.");
            return;
        }

        const username = (document.getElementById("username") as HTMLInputElement).value;
        const name = (document.getElementById("name") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const phone = (document.getElementById("phone") as HTMLInputElement).value;
        const education = (document.getElementById("education") as HTMLTextAreaElement).value;
        const workExperience = (document.getElementById("workExperience") as HTMLTextAreaElement).value;
        const skills = (document.getElementById("skills") as HTMLInputElement).value.split(",").map(skill => skill.trim());

        const profilePictureSrc = imagePreview.src !== "#" ? imagePreview.src : "";

        resumeContent.innerHTML = `
            <h2>${name}</h2>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
            <p>Education: ${education}</p>
            <p>Work Experience: ${workExperience}</p>
            <p>Skills: ${skills.join(", ")}</p>
            ${profilePictureSrc ? `<img src="${profilePictureSrc}" alt="Profile Picture" class="img-thumbnail">` : ""}
        `;

        // Generate a shareable link
        const resumeLink = `${username}.vercel.app/resume`;
        document.getElementById("resumeLink")!.innerHTML = `Shareable Link: <a href="${resumeLink}" target="_blank">${resumeLink}</a>`;
    });

    // Handle profile picture preview
    const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement;
    profilePictureInput?.addEventListener("change", function (this: HTMLInputElement) {
        if (this.files?.length) {
            const file = this.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target!.result as string;
                imagePreview.style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle PDF download
    downloadPDFBtn?.addEventListener("click", () => {
        const { jsPDF } = window.jspdf;
        html2canvas(resumeContent).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; // A4 width in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('resume.pdf');
        });
    });
});

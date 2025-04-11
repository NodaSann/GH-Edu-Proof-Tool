const canvas = document.getElementById('textCanvas');
const ctx = canvas.getContext('2d');
const downloadLink = document.getElementById('downloadLink');
const generateButton = document.getElementById('generateButton');

canvas.width = 850;
canvas.height = 700;

function generateImage() {
    const data = {
        name: document.getElementById("name").value,
        institution: document.getElementById("institution").value,
        class: document.getElementById("class").value,
        major: document.getElementById("major").value,
        student_id: document.getElementById("student_id").value,
        graduation_year: document.getElementById("graduation_year").value,
    };

    const graduationYear = data.graduation_year;
    const studentStatusValue = `Registered (Expected Graduation Date: July 31, ${graduationYear})`;

    const fields = [
        ["Name:", data.name],
        ["Institution:", data.institution],
        ["Level:", "Undergraduate"],
        ["Class:", data.class],
        ["Major:", data.major],
        ["Student ID:", data.student_id],
        ["Duration:", "4 years"],
        ["Type:", "Regular Higher Education"],
        ["Mode:", "Full-time"],
        ["Student Status:", studentStatusValue]
    ];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 填充白色背景
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制标题
    ctx.font = 'bold 28px Arial, sans-serif';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText("Ministry of Education Student Status Online Verification", canvas.width / 2, 50);

    // 绘制字段
    ctx.font = 'bold 20px Arial, sans-serif';
    ctx.fontFamily = 'arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    let y = 100;
    const lineHeight = 30;
    let x = 60;
    const valueOffsetX = 180;
    const maxValueWidth = canvas.width - x - valueOffsetX - 80;

    function drawWrappedText(context, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        context.fillText(line, x, y);
        return y;
    }


    fields.forEach(field => {
        ctx.fillStyle = 'black';
        ctx.fillText(field[0], x, y);
        ctx.fillStyle = 'black';
        y = drawWrappedText(ctx, field[1], x + valueOffsetX, y, maxValueWidth, lineHeight);
        y += lineHeight;
    });

    const image = canvas.toDataURL('image/jpeg', 0.9);

    downloadLink.href = image;
    downloadLink.style.display = 'inline';
}

generateButton.addEventListener('click', () => {
    generateImage();
});
function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function updateSSLSettings() {
    if (document.cookie.includes('stop=true')) {
        alert('请求次数过多，请等待一分钟后重试。');
        return;
    }

    var zoneIdInput = document.getElementById('zoneId');
    var emailInput = document.getElementById('email');
    var apiKeyInput = document.getElementById('apiKey');
    var certificateAuthorityInput = document.getElementById('certificateAuthority');

    if (zoneIdInput.value === '' || emailInput.value === '' || apiKeyInput.value === '' || certificateAuthorityInput.value === '') {
        alert('请填写所有必填的项目');
        return;
    }

    var email = emailInput.value;

    if (!isEmailValid(email)) {
        alert('请输入有效的邮箱地址。');
        emailInput.focus();
        return;
    }

    document.getElementById('resultMessage').innerText = '请求已提交，请等待一段时间后前往网站 > SSL/TLS > 边缘证书 中查看是否提交成功。';

    document.cookie = 'stop=true; max-age=60';

    var zoneId = zoneIdInput.value;
    var apiKey = apiKeyInput.value;
    var certificateAuthority = certificateAuthorityInput.value;

    fetch('https://apissl.armolab.cc/updateSSLSettings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            zoneId: zoneId,
            email: email,
            apiKey: apiKey,
            certificateAuthority: certificateAuthority,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Request limit exceeded. Try again later.');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('resultMessage').innerText = 'SSL settings updated successfully';
    })
    .catch(error => {
        document.getElementById('resultMessage').innerText = 'Error updating SSL settings: ' + error.message;
    });
}

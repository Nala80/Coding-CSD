<?php
header('Content-Type: application/json');

$loginUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:AJYNiMjQ/auth/login';
$loginPayload = json_encode([
    'email' => 'expoprice@digilabflevoland.nl',
    'password' => 'yjJ9$dhjS5LTS3Ef'
]);

$loginCurl = curl_init($loginUrl);
curl_setopt($loginCurl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($loginCurl, CURLOPT_POST, true);
curl_setopt($loginCurl, CURLOPT_POSTFIELDS, $loginPayload);
curl_setopt($loginCurl, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);

$loginResponse = curl_exec($loginCurl);
$loginStatus = curl_getinfo($loginCurl, CURLINFO_HTTP_CODE);
curl_close($loginCurl);

if ($loginStatus === 200) {
    $loginData = json_decode($loginResponse, true);
    $token = $loginData['authToken'];

    $dataUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:GSLMdsZr/ardino_sensor_api';
    $dataCurl = curl_init($dataUrl);
    curl_setopt($dataCurl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($dataCurl, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer $token"
    ]);

    $dataResponse = curl_exec($dataCurl);
    curl_close($dataCurl);

    echo $dataResponse;
} else {

    http_response_code(401);
    echo json_encode(["error" => "Login failed"]);
}
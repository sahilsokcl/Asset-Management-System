// backend/api/depreciation/read.php
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../../config/Database.php';
include_once '../../models/Depreciation.php';

$database = new Database();
$db = $database->getConnection();

$depreciation = new Depreciation($db);

$stmt = $depreciation->read();
$num = $stmt->rowCount();

if($num > 0) {
    $depreciation_arr = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $depreciation_item = array(
            "id" => $id,
            "name" => $name,
            "cost" => $cost,
            "period" => $period,
            "category" => $category,
            "assetValue" => $assetValue
        );
        array_push($depreciation_arr, $depreciation_item);
    }
    http_response_code(200);
    echo json_encode($depreciation_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No depreciations found."));
}

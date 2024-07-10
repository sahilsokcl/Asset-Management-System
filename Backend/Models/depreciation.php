<?php
class Depreciation {
    private $conn;
    private $table_name = "depreciation";

    public $id;
    public $name;
    public $cost;
    public $period;
    public $category;
    public $assetValue;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET name=:name, cost=:cost, period=:period, category=:category, assetValue=:assetValue";
        $stmt = $this->conn->prepare($query);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->cost = htmlspecialchars(strip_tags($this->cost));
        $this->period = htmlspecialchars(strip_tags($this->period));
        $this->category = htmlspecialchars(strip_tags($this->category));
        $this->assetValue = htmlspecialchars(strip_tags($this->assetValue));

        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":cost", $this->cost);
        $stmt->bindParam(":period", $this->period);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":assetValue", $this->assetValue);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . " SET name=:name, cost=:cost, period=:period, category=:category, assetValue=:assetValue WHERE id=:id";
        $stmt = $this->conn->prepare($query);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->cost = htmlspecialchars(strip_tags($this->cost));
        $this->period = htmlspecialchars(strip_tags($this->period));
        $this->category = htmlspecialchars(strip_tags($this->category));
        $this->assetValue = htmlspecialchars(strip_tags($this->assetValue));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":cost", $this->cost);
        $stmt->bindParam(":period", $this->period);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":assetValue", $this->assetValue);
        $stmt->bindParam(":id", $this->id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id=:id";
        $stmt = $->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(":id", $this->id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }
}

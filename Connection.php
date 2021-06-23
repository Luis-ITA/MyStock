<?php
    $dsn = 'mysql:host=localhost; dbname=inventory';
    $username = 'root';
    $password = '';
    try{
        $bd = new PDO($dsn, $username, $password);
    }
    catch(PDOException $e){
        die();
    }


    if($_POST['option'] == 'showProvider')
    {
        $array = array();
        $x=0;
        $consulta=$bd->query("SELECT providerId, trademark, agentName, agentLastName, cellphone, email FROM provider");
        while($res = $consulta->fetch()){
            $array[$x]['id'] = $res['providerId'];
            $array[$x]['marca'] = $res['trademark'];
            $array[$x]['nombre'] = $res['agentName'];
            $array[$x]['apellido'] = $res['agentLastName'];
            $array[$x]['numero'] = $res['cellphone'];
            $array[$x]['correo'] = $res['email'];
            $x++;
        }
        echo json_encode($array);   
    }

    if($_POST['option'] == 'showProduct')
    {
        $array = array();
        $x=0;
        $consulta=$bd->query("select productId, name, description, stock, providerId, storeId FROM product");
        while($res = $consulta->fetch()){
            $sql = "select trademark from provider where providerId = '".$res['providerId']."'";
            $stmt = $bd-> prepare($sql);

            $stmt->bindParam($res['providerId'], $_POST["providerId"]);

            $stmt->execute();

            $sql2 = "select name from store where storeId = '".$res['storeId']."'";
            $stmt2 = $bd-> prepare($sql2);

            $stmt2->bindParam($res['providerId'], $_POST["providerId"]);

            $stmt2->execute();

            $array[$x]['id'] = $res['productId'];
            $array[$x]['nameP'] = $res['name'];
            $array[$x]['descriptionP'] = $res['description'];
            $array[$x]['stockP'] = $res['stock'];
            $array[$x]['idstoreP'] = $res['storeId'];

            while($res = $stmt->fetch()){
             $array[$x]['trademarkP'] = $res['trademark'];
            }
            while($res = $stmt2->fetch()){
                $array[$x]['location'] = $res['name'];
            }
            $x++;
        }
        echo json_encode($array);   
    }

    if($_POST['option'] == 'showStore')
    {
        $array = array();
        $x=0;
        $consulta=$bd->query("SELECT storeId, name, description, location FROM store");
        while($res = $consulta->fetch()){
            $array[$x]['id'] = $res['storeId'];
            $array[$x]['nameS'] = $res['name'];
            $array[$x]['descriptionS'] = $res['description'];
            $array[$x]['locationS'] = $res['location'];
            $x++;
        }
        echo json_encode($array);   
    }

    if($_POST['option'] == 'updateProvider')
    {
        $sql = "Update provider set trademark = :trademark2, agentName = :name, 
                agentLastName = :lastname, cellphone = :phone, email = :mail 
                where providerId = :providerId";

        $statement = $bd -> prepare($sql);

        $statement->bindParam(':providerId',$_POST["providerId"]);
        $statement->bindParam(':trademark2', $_POST["trademark"]);
        $statement->bindParam(':name', $_POST["agentName"]);
        $statement->bindParam(':lastname', $_POST["agentLastName"]);
        $statement->bindParam(':phone', $_POST["cellphone"]);
        $statement->bindParam(':mail', $_POST["email"]);

        $statement->execute();

        if($statement->rowCount()>0)
        {
            echo json_encode(array('login'=> true));   
        } 
        else
        {
            echo json_encode(array('login'=> false));   
        }
    }

    if($_POST['option'] == 'updateProduct')
    {
        $sql = "Update product set name = :name2, description = :description2, 
                stock = :stock2, storeId = :idstore2
                where productId = :productId";

        $statement = $bd -> prepare($sql);

        $statement->bindParam(':productId',$_POST["productId"]);
        $statement->bindParam(':name2', $_POST["name"]);
        $statement->bindParam(':description2', $_POST["description"]);
        $statement->bindParam(':stock2', $_POST["stock"]);
        $statement->bindParam(':idstore2', $_POST["storeId"]);

        $statement->execute();

        if($statement->rowCount()>0)
        {
            echo json_encode(array('login'=> true));   
        } 
        else
        {
            echo json_encode(array('login'=> false));   
        }
    }

    if($_POST['option'] == 'updateStore')
    {
        $sql = "Update store set name = :name, description = :description, 
                location = :location
                where storeId = :idwarehouse";

        $statement = $bd -> prepare($sql);

        $statement->bindParam(':idwarehouse', $_POST["storeId"]);
        $statement->bindParam(':name', $_POST["name"]);
        $statement->bindParam(':description', $_POST["description"]);
        $statement->bindParam(':location', $_POST["location"]);

        $statement->execute();

        if($statement->rowCount()>0)
        {
            echo json_encode(array('login'=> true));   
        } 
        else
        {
            echo json_encode(array('login'=> false));   
        }
    }

    if ($_POST['option']=='deleteProvider')
    {
        $sql="delete from provider where providerId = :providerId";
        $statement = $bd->prepare($sql);

        $statement->bindParam(':providerId',$_POST["providerId"]);
        $statement->execute();
        
        echo $statement->fetch();

    }

    if ($_POST['option']=='deleteProduct')
    {
        $sql="delete from product where productId = :productId";
        $statement = $bd->prepare($sql);

        $statement->bindParam(':productId',$_POST["productId"]);
        $statement->execute();
        
        echo $statement->fetch();

    }

    if($_POST['option'] == 'showStoreProduct')
    {
        $sql="select productId, name, description, stock, providerId FROM product where storeId= :storeId";
        $statement = $bd -> prepare($sql);
        $statement->bindParam(':storeId', $_POST["storeId"]);
        $statement->execute();

        $array = array();
        $x=0;
        while($res = $statement->fetch()){

            $sentence = "select trademark from provider where providerId = '".$res['providerId']."'";
            $stmt = $bd-> prepare($sentence);
            $stmt->bindParam($res['providerId'], $_POST["providerId"]);
            $stmt->execute();

            $array[$x]['id'] = $res['productId'];
            $array[$x]['nameSP'] = $res['name'];
            $array[$x]['descriptionSP'] = $res['description'];
            $array[$x]['stockSP'] = $res['stock'];

            while($res = $stmt->fetch()){
                $array[$x]['trademarkSP'] = $res['trademark'];
               }
               $x++;
        }
        echo json_encode($array); 
    }

    if ($_POST['option']=='addProduct')
    {
        $sql="insert into product (productId, name, description, stock, providerId, storeId) values (:productId, :name, :description, :stock, :providerId, :storeId)";
        $statement = $bd->prepare($sql);
    
        $statement->bindParam(':productId',$_POST["productId"]);
        $statement->bindParam(':name',$_POST["name"]);
        $statement->bindParam(':description',$_POST["description"]);
        $statement->bindParam(':stock',$_POST["stock"]);
        $statement->bindParam(':providerId',$_POST["providerId"]);
        $statement->bindParam(':storeId',$_POST["storeId"]);
        $statement->execute();
    }

    if ($_POST['option']=='addStore')
    {
        $sql="insert into store (storeId, name, description, location) values (:storeId, :name, :description, :location)";
        $statement = $bd->prepare($sql);
    
        $statement->bindParam(':storeId',$_POST["storeId"]);
        $statement->bindParam(':name',$_POST["name"]);
        $statement->bindParam(':description',$_POST["description"]);
        $statement->bindParam(':location',$_POST["location"]);
        $statement->execute();
    }

    if ($_POST['option']=='addProvider'){
        $sql="insert into provider (providerId, trademark, agentName, agentLastName, cellphone, email) values (:providerId, :trademark, :agentName, :agentLastName, :cellphone, :email)";
        $statement = $bd->prepare($sql);
    
        $statement->bindParam(':providerId',$_POST["providerId"]);
        $statement->bindParam(':trademark',$_POST["trademark"]);
        $statement->bindParam(':agentName',$_POST["agentName"]);
        $statement->bindParam(':agentLastName',$_POST["agentLastName"]);
        $statement->bindParam(':cellphone',$_POST["cellphone"]);
        $statement->bindParam(':email',$_POST["email"]);
        $statement->execute();
    }

    if ($_POST['option']=='deleteStore')
    {
        $sql="delete from store where storeId = :storeId";
        $statement = $bd->prepare($sql);

        $statement->bindParam(':storeId',$_POST["storeId"]);
        $statement->execute();
        
        echo $statement->fetch();

    }

    if($_POST['option'] == 'showInput')
    {
        $array = array();
        $x=0;
        $consulta=$bd->query("select inputId, date, stock, productId FROM input");
        while($res = $consulta->fetch()){
            $sql = "select name from product where productId = '".$res['productId']."'";
            $stmt = $bd-> prepare($sql);

            $stmt->bindParam($res['productId'], $_POST["productId"]);

            $stmt->execute();

            $sql2 = "select providerId from product where productId = '".$res['productId']."'";
            $stmt2 = $bd-> prepare($sql2);

            $stmt2->bindParam($res['productId'], $_POST["productId"]);

            $stmt2->execute();

            $array[$x]['id'] = $res['inputId'];
            $array[$x]['datetime'] = $res['date'];
            $array[$x]['stock'] = $res['stock'];

            while($res = $stmt->fetch()){
             $array[$x]['product'] = $res['name'];
            }

            while($res = $stmt2->fetch()){
                $providerId = $res['providerId'];
            }

            $sql3 = "select trademark from provider where providerId = $providerId";
            $stmt3 = $bd-> prepare($sql3);

            $stmt3->bindParam($providerId, $_POST["providerId"]);

            $stmt3->execute();

            while($res = $stmt3->fetch()){
                $array[$x]['trademark'] = $res['trademark'];
               }


            $x++;
        }
        echo json_encode($array); 
    }

    if($_POST['option'] == 'showOutput')
    {
        $array = array();
        $x=0;
        $consulta=$bd->query("select outputId, date, stock, productId FROM output");
        while($res = $consulta->fetch()){
            $sql = "select name from product where productId = '".$res['productId']."'";
            $stmt = $bd-> prepare($sql);

            $stmt->bindParam($res['productId'], $_POST["productId"]);

            $stmt->execute();

            $sql2 = "select providerId from product where productId = '".$res['productId']."'";
            $stmt2 = $bd-> prepare($sql2);

            $stmt2->bindParam($res['productId'], $_POST["productId"]);

            $stmt2->execute();

            $array[$x]['id'] = $res['outputId'];
            $array[$x]['datetime'] = $res['date'];
            $array[$x]['stock'] = $res['stock'];

            while($res = $stmt->fetch()){
             $array[$x]['product'] = $res['name'];
            }

            while($res = $stmt2->fetch()){
                $providerId = $res['providerId'];
            }

            $sql3 = "select trademark from provider where providerId = $providerId";
            $stmt3 = $bd-> prepare($sql3);

            $stmt3->bindParam($providerId, $_POST["providerId"]);

            $stmt3->execute();

            while($res = $stmt3->fetch()){
                $array[$x]['trademark'] = $res['trademark'];
               }

            $x++;
        }
        echo json_encode($array); 
    }

    if ($_POST['option']=='addInput')
    {
        $sql="insert into input (productId, stock) values (:productId,:stock)";
        $statement = $bd->prepare($sql);
    
        $statement->bindParam(':productId',$_POST["productId"]);
        $statement->bindParam(':stock',$_POST["stock"]);
        $statement->execute();

        $sql2="select stock FROM product WHERE productId = :productId";
        $statement2 = $bd->prepare($sql2);
    
        $statement2->bindParam(':productId',$_POST["productId"]);
        $statement2->execute();

        while($res = $statement2->fetch()){
            $cantidad = $res['stock'];
           }

        $sql3="select stock FROM input";
        $statement3 = $bd->prepare($sql3);
        $statement3->execute();
   
        while($res = $statement3->fetch()){
            $entra = $res['stock'];
        }

        echo $cantidad;
        echo $entra;
        $new = $cantidad + $entra;
        echo $new;


        $sql4 = "Update product set stock = $new 
        where productId = :productId";

        $statement4 = $bd -> prepare($sql4);
        $statement4->bindParam(':productId',$_POST["productId"]);
        $statement4->execute();
    }

    if ($_POST['option']=='addOutput')
    {
        $sql="insert into output (productId, stock) values (:productId, :stock)";
        $statement = $bd->prepare($sql);
    
        $statement->bindParam(':productId',$_POST["productId"]);
        $statement->bindParam(':stock',$_POST["stock"]);
        $statement->execute();

        $sql2="select stock FROM product WHERE productId = :productId";
        $statement2 = $bd->prepare($sql2);
    
        $statement2->bindParam(':productId',$_POST["productId"]);
        $statement2->execute();

        while($res = $statement2->fetch()){
            $cantidad = $res['stock'];
           }

        $sql3="select outputId, stock FROM output";
        $statement3 = $bd->prepare($sql3);
        $statement3->execute();
   
        while($res = $statement3->fetch()){
            $sale = $res['stock'];
        }

        echo $cantidad;
        echo $sale;
        $new = $cantidad - $sale;
        echo $new;

        $sql4 = "Update product set stock = $new 
        where productId = :productId";

        $statement4 = $bd -> prepare($sql4);
        $statement4->bindParam(':productId',$_POST["productId"]);
        $statement4->execute();
    }
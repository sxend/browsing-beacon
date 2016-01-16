import akka.actor.ActorSystem
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.marshalling.Marshal
import akka.http.scaladsl.model.StatusCodes._
import spray.json.{JsObject, DefaultJsonProtocol}
import spray.json._
import scala.concurrent.Future
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer
import DefaultJsonProtocol._

/**
  * Created by sxend on 1/15/16.
  */
object BeaconCatcher {
  def main(args: Array[String]): Unit = {


    implicit val system = ActorSystem()
    implicit val materializer = ActorMaterializer()
    val route =
      get {
        path("beacon") {
          parameter("message") { (message) =>
            println(message)
            complete(NoContent)
          }
        }
      }

    Http().bindAndHandle(route, "localhost", 9000)
  }
}

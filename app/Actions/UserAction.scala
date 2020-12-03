package Actions

import javax.inject.Inject
import pdi.jwt.{JwtAlgorithm, JwtJson}
import play.api.Configuration
import play.api.mvc.{ActionBuilder, Request, Result}

import scala.concurrent.{ExecutionContext, Future}
import play.api.mvc._

case class UserRequest[A](val username: Option[String], request: Request[A]) extends WrappedRequest[A](request)

class UserAction @Inject()(val parser: BodyParsers.Default,configuration: Configuration)(implicit val executionContext: ExecutionContext)
  extends ActionBuilder[UserRequest, AnyContent] {
  override def invokeBlock[A](request: Request[A], block: UserRequest[A] => Future[Result]): Future[Result] = {
    val jwtSecret = configuration.get[String]("jwtSecret")
    extractToken(request) match {
      case Some(value) if (JwtJson.isValid(value,jwtSecret,Seq(JwtAlgorithm.HS256))) =>
        block(UserRequest[A](Some(JwtJson.decode(value,jwtSecret,Seq(JwtAlgorithm.HS256)).get.content), request))
      case _ =>
        Future.successful(Results.Unauthorized)

    }
  }

  private def extractToken[A](request: Request[A]): Option[String] = {
    println(request.headers.get("Authorization"))
    request.headers.get("Authorization").flatMap(_.split("Bearer ") match {
      case Array(_, token) =>
        Some(token)
      case _ =>
        None

    })
  }
}


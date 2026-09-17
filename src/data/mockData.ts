import { GoalPreset } from '../types';

export const INITIAL_PRESETS: GoalPreset[] = [
  {
    id: 'infosec',
    name: '정보처리기사 실기',
    defaultHours: '2시간',
    description: '비전공자도 단번에 합격하는 소프트웨어 공학 & 프로그래밍 핵심 완성 코스',
    days: [
      {
        dayOfWeek: '월',
        dayNumber: 1,
        dateStr: '10.19 (월)',
        title: '소프트웨어 생명주기 & 개발 방법론',
        isToday: false,
        tasks: [
          {
            id: 'task-d1-1',
            title: 'SDLC 모델(폭포수, 프로토타입, 나선형, 애자일) 특징 비교',
            category: '소프트웨어 공학',
            estimatedMinutes: 40,
            difficulty: '초급',
            completed: true,
            concept: {
              topic: 'SDLC 모델(소프트웨어 개발 생명주기)',
              analogy: '집을 지을 때 설계도부터 완공까지 한번에 짓는 방식(폭포수)과, 모델하우스부터 먼저 보여주며 고쳐나가는 방식(애자일)의 차이입니다.',
              summary: [
                '폭포수 모델: 각 단계를 순차적으로 완료해야 다음 단계로 이동 (피드백 반영 어려움)',
                '나선형 모델: 계획 -> 위험분석 -> 개발 -> 평가를 나선형으로 반복 (위험관리가 핵심)',
                '애자일(Agile): 고객 중심, 짧은 반복 주기를 통해 변화에 신속히 대응 (스크럼, 칸반, XP 등)'
              ],
              keyPoints: [
                '나선형 모델의 4대 활동(계획수립 -> 위험분석 -> 개발 및 검증 -> 고객평가) 순서 암기 필수',
                '애자일 선언문 4대 가치(개인과 상호작용, 작동하는 소프트웨어, 고객과의 협력, 변화 대응)'
              ],
              coachTip: '시험에서는 나선형 모델의 위험분석 단계와 애자일 XP의 5대 가치(용기, 단순성, 의사소통, 피드백, 존중)가 단답형으로 매우 자주 나옵니다!'
            },
            quiz: [
              {
                id: 1,
                question: '소프트웨어 개발 생명주기(SDLC) 모형 중 위험 분석(Risk Analysis)을 중심에 두고 점진적으로 개발해 나가는 모형은?',
                options: ['폭포수 모형', '나선형 모형', '애자일 모형', 'RAD 모형'],
                answerIndex: 1,
                explanation: '나선형(Spiral) 모형은 보헴(Boehm)이 제안한 것으로 계획수립 -> 위험분석 -> 공학적 개발 -> 고객평가의 4단계를 반복하며 대규모 위험 부담이 큰 프로젝트에 적합합니다.'
              },
              {
                id: 2,
                question: 'XP(eXtreme Programming)의 5가지 핵심 가치에 해당하지 않는 것은?',
                options: ['용기 (Courage)', '단순성 (Simplicity)', '문서화 (Documentation)', '피드백 (Feedback)'],
                answerIndex: 2,
                explanation: 'XP의 5가지 핵심 가치는 용기(Courage), 단순성(Simplicity), 의사소통(Communication), 피드백(Feedback), 존중(Respect)입니다. 문서화는 전통적 기법에서 강조합니다.'
              },
              {
                id: 3,
                question: '각 단계를 완벽히 검증한 후 다음 단계로 진행하며, 요구사항 변경이 어려운 전통적인 선형 순차적 모형은?',
                options: ['폭포수 모형', '스크럼 모형', '프로토타이핑 모형', '애자일 모형'],
                answerIndex: 0,
                explanation: '폭포수(Waterfall) 모형은 가장 오래된 방식으로, 폭포수가 거슬러 올라갈 수 없듯 이전 단계로의 피드백이 어렵다는 단점이 있습니다.'
              },
              {
                id: 4,
                question: '스크럼(Scrum) 개발 방법론에서 매일 15분 정도 서서 어제 한 일, 오늘 할 일, 장애 요소를 공유하는 회의는?',
                options: ['스프린트 백로그', '데일리 스크럼 미팅', '스프린트 리뷰', '회고(Retrospective)'],
                answerIndex: 1,
                explanation: '데일리 스크럼(Daily Stand-up) 미팅은 매일 짧게 진행 상황과 장애 요소를 공유하는 회의입니다.'
              },
              {
                id: 5,
                question: 'XP의 주요 실천 방법(Practices) 중 두 개발자가 하나의 컴퓨터에서 한 명은 코딩, 한 명은 검토하는 기법은?',
                options: ['짝 프로그래밍(Pair Programming)', '지속적 통합(CI)', '리팩토링(Refactoring)', '메타포어(Metaphor)'],
                answerIndex: 0,
                explanation: '짝 프로그래밍(Pair Programming)은 2명이 짝이 되어 개발과 코드 리뷰를 동시에 수행하는 XP 실천 기법입니다.'
              }
            ]
          },
          {
            id: 'task-d1-2',
            title: '스크럼(Scrum) 및 XP의 12대 실천항목 키워드 암기',
            category: '애자일',
            estimatedMinutes: 30,
            difficulty: '초급',
            completed: true,
            concept: {
              topic: 'XP 12대 실천 원칙',
              analogy: '운전할 때 네비게이션을 보며 계속 핸들을 미세조정하듯, 지속적인 피드백과 작은 단위 배포로 품질을 유지하는 방법입니다.',
              summary: [
                'TDD(테스트 주도 개발): 코드 작성 전 테스트 케이스를 먼저 작성',
                'CI(지속적 통합): 모듈 단위 코드를 수시로 빌드 및 테스트 자동화',
                '리팩토링: 기능 변경 없이 코드의 가독성과 구조를 개선'
              ],
              keyPoints: [
                'Pair Programming, TDD, Continuous Integration, Refactoring, Small Releases 5대 핵심 실천법'
              ],
              coachTip: 'TDD의 작성 순서(Test Fail -> Pass code -> Refactor)를 잊지 마세요!'
            },
            quiz: [
              {
                id: 1,
                question: '기존 프로그램의 동작이나 외부 기능을 변경하지 않고 내부 구조를 개선하여 가독성과 유지보수성을 높이는 작업은?',
                options: ['리팩토링(Refactoring)', '역공학(Reverse Engineering)', '재공학(Re-engineering)', '형상 관리(SCM)'],
                answerIndex: 0,
                explanation: '리팩토링은 겉으로 드러나는 기능 변경 없이 소프트웨어 내부의 결함을 줄이고 가독성을 높이는 기법입니다.'
              },
              {
                id: 2,
                question: '테스트 코드를 먼저 작성한 뒤 이를 통과하기 위한 최소한의 코드를 작성하며 점진적으로 기능을 완성하는 개발 방식은?',
                options: ['TDD', 'BDD', 'DDD', 'XP-Design'],
                answerIndex: 0,
                explanation: 'TDD(Test-Driven Development)는 테스트 주도 개발 방법론입니다.'
              },
              {
                id: 3,
                question: '개발자들이 작업한 코드를 하루에도 여러 번 중앙 저장소에 병합하고 자동 빌드 및 테스트를 수행하는 것은?',
                options: ['지속적 통합(CI)', '지속적 배포(CD)', '형상 식별', '베이스라인 구축'],
                answerIndex: 0,
                explanation: 'CI(Continuous Integration)는 지속적인 코드 병합 및 자동 검증을 의미합니다.'
              },
              {
                id: 4,
                question: '고객에게 가능한 한 짧은 주기로 소프트웨어 결과물을 작동 가능한 상태로 인도하는 XP 실천 원칙은?',
                options: ['Small Releases (소규모 릴리즈)', 'Planning Game', 'Metaphor', '40-Hour Week'],
                answerIndex: 0,
                explanation: '소규모 릴리즈(Small Releases)는 릴리즈 주기를 짧게 하여 고객의 요구사항 변화를 빠르게 파악하는 기법입니다.'
              },
              {
                id: 5,
                question: '소프트웨어 공학에서 코드 냄새(Code Smell)를 제거하기 위해 주로 수행하는 활동은?',
                options: ['리팩토링', '정적 컴파일', '스모크 테스트', '부하 테스트'],
                answerIndex: 0,
                explanation: '코드 냄새(중복 코드, 너무 긴 함수 등 악취)는 리팩토링을 통해 제거합니다.'
              }
            ]
          }
        ]
      },
      {
        dayOfWeek: '화',
        dayNumber: 2,
        dateStr: '10.20 (화)',
        title: '요구사항 확인 & UML 모델링',
        isToday: false,
        tasks: [
          {
            id: 'task-d2-1',
            title: '기능적 요구사항 vs 비기능적 요구사항 분류 기준 마스터',
            category: '요구사항 분석',
            estimatedMinutes: 30,
            difficulty: '초급',
            completed: true,
            concept: {
              topic: '기능적 vs 비기능적 요구사항',
              analogy: '스마트폰을 살 때 "전화 통화, 카메라 촬영 기능"은 기능적 요구사항, "1회 충전으로 24시간 사용, 방수 등급"은 비기능적 요구사항입니다.',
              summary: [
                '기능적 요구사항: 시스템이 "무엇(What)"을 해야 하는지 명시 (연산, 데이터 입력, 출력, 인터페이스)',
                '비기능적 요구사항: 시스템이 갖추어야 할 "품질/제약조건(How well)" (성능, 보안, 가용성, 유지보수성)',
                '요구사항 개발 프로세스: 도출 -> 분석 -> 명세 -> 확인'
              ],
              keyPoints: [
                '"응답 속도 2초 이내", "암호화 적용" 등은 비기능적 요구사항의 대표적 사례입니다.'
              ],
              coachTip: '문제에서 "초당 1000건 처리", "24시간 무중단" 문구가 나오면 무조건 비기능적 요구사항입니다!'
            },
            quiz: [
              {
                id: 1,
                question: '다음 중 "비기능적 요구사항"에 해당하는 것은?',
                options: [
                  '사용자는 회원가입 시 아이디와 비밀번호를 입력한다.',
                  '결제 시 신용카드와 간편결제를 지원해야 한다.',
                  '시스템은 24시간 365일 무중단으로 가용률 99.9%를 유지해야 한다.',
                  '관리자는 회원 탈퇴 요청을 승인할 수 있다.'
                ],
                answerIndex: 2,
                explanation: '가용성, 성능, 신뢰성, 보안성 등의 품질 요구사항은 비기능적 요구사항입니다.'
              },
              {
                id: 2,
                question: '요구사항 개발 프로세스 4단계를 순서대로 바르게 나열한 것은?',
                options: [
                  '도출 -> 분석 -> 명세 -> 확인',
                  '분석 -> 도출 -> 확인 -> 명세',
                  '도출 -> 명세 -> 분석 -> 확인',
                  '명세 -> 도출 -> 분석 -> 확인'
                ],
                answerIndex: 0,
                explanation: '요구사항 개발 프로세스는 도출(Elicitation) -> 분석(Analysis) -> 명세(Specification) -> 확인/검증(Validation) 순서입니다.'
              },
              {
                id: 3,
                question: 'UML 다이어그램 중 대표적인 정적(구조적) 다이어그램에 해당하는 것은?',
                options: ['클래스 다이어그램', '시퀀스 다이어그램', '액티비티 다이어그램', '상태 다이어그램'],
                answerIndex: 0,
                explanation: '클래스 다이어그램은 시스템의 정적 구조를 나타냅니다. 시퀀스, 액티비티, 상태 다이어그램은 동적(행위) 다이어그램입니다.'
              },
              {
                id: 4,
                question: 'UML 관계 중 하위 객체가 상위 객체의 속성과 연산을 그대로 물려받는 관계는?',
                options: ['일반화(Generalization) 관계', '연관(Association) 관계', '의존(Dependency) 관계', '실체화(Realization) 관계'],
                answerIndex: 0,
                explanation: '일반화 관계는 객체지향의 상속(Inheritance)을 의미하며 실선과 빈 삼각 화살표로 표현합니다.'
              },
              {
                id: 5,
                question: '유스케이스 다이어그램에서 한 유스케이스가 특정 조건에서만 다른 유스케이스의 기능을 수행하는 관계는?',
                options: ['확장(Extend) 관계', '포함(Include) 관계', '일반화 관계', '그룹화 관계'],
                answerIndex: 0,
                explanation: '확장(<<extend>>) 관계는 조건부 선택 실행일 때, 포함(<<include>>) 관계는 반드시 함께 실행될 때 사용됩니다.'
              }
            ]
          }
        ]
      },
      {
        dayOfWeek: '수',
        dayNumber: 3,
        dateStr: '10.21 (수)',
        title: '소프트웨어 아키텍처 & 디자인 패턴',
        isToday: true,
        tasks: [
          {
            id: 'task-d3-1',
            title: '아키텍처 패턴(MVC, MVVM, Layered) 핵심 개념 정리',
            category: '아키텍처',
            estimatedMinutes: 30,
            difficulty: '초급',
            completed: true,
            concept: {
              topic: '소프트웨어 아키텍처 패턴',
              analogy: '도시 계획에서 주거 구역, 상업 구역, 공업 구역을 명확히 분리하여 도시가 효율적으로 돌아가도록 만드는 기본 구조 틀입니다.',
              summary: [
                'MVC 패턴: 모델(데이터/비즈니스 로직), 뷰(화면 UI), 컨트롤러(사용자 입력 및 흐름 제어)로 관심사를 명확히 분리',
                'Layered 패턴: 계층별로 역할을 나누어 하위 계층은 상위 계층에 서비스를 제공 (프레젠테이션 -> 비즈니스 -> 데이터)',
                '파이프-필터: 데이터 스트림이 필터를 거치며 순차적으로 가공되는 구조 (UNIX 파이프, 컴파일러 등)'
              ],
              keyPoints: [
                'MVC에서 Model과 View 간의 직접 결합도를 낮추어 독립적인 수정이 가능함',
                '브로커(Broker) 패턴: 분산 시스템에서 컴포넌트 간 통신을 중개하는 서버 아키텍처'
              ],
              coachTip: '정보처리기사 실기에서는 MVC 각 컴포넌트의 역할과 파이프-필터 패턴의 특징을 묻는 단답형이 빈출됩니다!'
            },
            quiz: [
              {
                id: 1,
                question: 'MVC 패턴의 구성 요소 중 비즈니스 로직과 데이터베이스 연동 상태를 관리하는 컴포넌트는?',
                options: ['Model', 'View', 'Controller', 'Router'],
                answerIndex: 0,
                explanation: 'Model(모델)은 애플리케이션의 핵심 데이터와 비즈니스 로직, 상태를 담당합니다.'
              },
              {
                id: 2,
                question: '데이터 스트림을 입력받아 가공한 뒤 다음 처리 단계로 넘겨주는 구조로, UNIX 쉘 파이프라인이나 컴파일러에 주로 쓰이는 아키텍처 패턴은?',
                options: ['파이프-필터 패턴', '블랙보드 패턴', '이벤트 기반 패턴', '피어 투 피어 패턴'],
                answerIndex: 0,
                explanation: '파이프-필터(Pipe-Filter) 패턴은 서브 컴포넌트(필터)가 파이프를 통해 전달받은 데이터를 순차적으로 변환 처리합니다.'
              },
              {
                id: 3,
                question: '소프트웨어 아키텍처의 4+1 뷰 중 최종 사용자의 요구사항을 식별하고 다른 모든 뷰의 중심이 되는 뷰는?',
                options: ['유스케이스 뷰(Use Case View)', '논리 뷰(Logical View)', '구현 뷰(Implementation View)', '배치 뷰(Deployment View)'],
                answerIndex: 0,
                explanation: '유스케이스 뷰는 다른 4가지 뷰(논리, 구현, 프로세스, 배포)를 검증하고 통합하는 중심 역할을 하여 4+1 뷰라고 부릅니다.'
              },
              {
                id: 4,
                question: '분산 환경에서 클라이언트가 원격 서비스를 투명하게 호출할 수 있도록 중간에서 요청을 전달하고 결과를 반환해 주는 아키텍처 패턴은?',
                options: ['브로커(Broker) 패턴', '계층화(Layered) 패턴', 'MVC 패턴', '마스터-슬레이브 패턴'],
                answerIndex: 0,
                explanation: '브로커(Broker) 패턴은 분산 시스템 컴포넌트의 통신을 중개하는 코디네이터 역할을 합니다.'
              },
              {
                id: 5,
                question: 'MVC 패턴에서 사용자의 마우스 클릭이나 키보드 입력을 받아 모델을 업데이트하고 적절한 뷰를 선택하는 컴포넌트는?',
                options: ['Controller', 'Model', 'View', 'State'],
                answerIndex: 0,
                explanation: 'Controller(컨트롤러)는 사용자의 입력을 수신하여 모델과 뷰를 제어하고 중개하는 역할을 합니다.'
              }
            ]
          },
          {
            id: 'task-d3-2',
            title: 'GoF 디자인 패턴 23종: 생성/구조/행위 패턴 구분법',
            category: '디자인 패턴',
            estimatedMinutes: 45,
            difficulty: '중급',
            completed: false,
            concept: {
              topic: 'GoF 디자인 패턴 분류 및 핵심 패턴',
              analogy: '요리 레시피에서 "식재료 손질법(생성)", "주방 도구 배치(구조)", "요리 순서와 서빙(행위)"처럼 자주 쓰이는 검증된 해결 공식입니다.',
              summary: [
                '생성 패턴(5개): 추상 팩토리, 빌더, 팩토리 메서드, 프로토타입, 싱글톤 (추빌팩프싱)',
                '구조 패턴(7개): 어댑터, 브리지, 컴포지트, 데코레이터, 퍼사드, 플라이웨이트, 프록시 (어브컴데퍼플프)',
                '행위 패턴(11개): 템플릿 메서드, 인터프리터, 이터레이터, 옵저버, 전략(Strategy), 상태, 방문자 등'
              ],
              keyPoints: [
                '싱글톤(Singleton): 인스턴스를 오직 하나만 생성하여 어디서든 전역 접근 가능하게 함',
                '어댑터(Adapter): 호환되지 않는 두 인터페이스를 연결하여 동작 가능하게 변환',
                '옵저버(Observer): 한 객체의 상태가 바뀌면 등록된 관찰자들에게 자동으로 알림 발송'
              ],
              coachTip: '정보처리기사 실기 1순위 암기 공식: "추.빌.팩.프.싱" 5글자만 외우면 생성 패턴 문제는 100% 맞출 수 있습니다!'
            },
            quiz: [
              {
                id: 1,
                question: '다음 중 GoF 디자인 패턴의 "생성 패턴(Creational Pattern)"에 해당하지 않는 것은?',
                options: ['싱글톤(Singleton)', '빌더(Builder)', '데코레이터(Decorator)', '추상 팩토리(Abstract Factory)'],
                answerIndex: 2,
                explanation: '데코레이터(Decorator)는 기존 객체에 동적으로 새로운 기능을 덧붙이는 "구조 패턴"입니다. 생성 패턴 5가지는 추상팩토리, 빌더, 팩토리메서드, 프로토타입, 싱글톤입니다.'
              },
              {
                id: 2,
                question: '클래스의 인스턴스가 오직 1개만 생성되도록 보장하고, 이 인스턴스에 대한 전역적인 접근점을 제공하는 패턴은?',
                options: ['싱글톤 패턴', '프로토타입 패턴', '어댑터 패턴', '프록시 패턴'],
                answerIndex: 0,
                explanation: '싱글톤(Singleton) 패턴은 시스템 전역에서 단 하나의 인스턴스만 공유할 때 사용됩니다.'
              },
              {
                id: 3,
                question: '호환성이 없는 인터페이스 때문에 함께 사용할 수 없는 클래스들을 개조하여 함께 작동할 수 있도록 110V-220V 돼지코처럼 변환해 주는 패턴은?',
                options: ['어댑터(Adapter) 패턴', '브리지(Bridge) 패턴', '컴포지트(Composite) 패턴', '퍼사드(Facade) 패턴'],
                answerIndex: 0,
                explanation: '어댑터(Adapter) 패턴은 클래스의 인터페이스를 클라이언트가 원하는 다른 인터페이스로 변환합니다.'
              },
              {
                id: 4,
                question: '객체의 상태 변화가 발생했을 때 연관된 다른 객체들에게 자동으로 통지하고 갱신하도록 1:N 의존 관계를 정의하는 행위 패턴은?',
                options: ['옵저버(Observer) 패턴', '전략(Strategy) 패턴', '방문자(Visitor) 패턴', '커맨드(Command) 패턴'],
                answerIndex: 0,
                explanation: '옵저버(Observer) 패턴은 발행-구독(Publish-Subscribe) 모델의 기초가 되는 패턴입니다.'
              },
              {
                id: 5,
                question: '동일 계열의 알고리즘들을 각각 캡슐화하여 상호 교환 가능하게 만들고, 클라이언트와 독립적으로 알고리즘을 변경할 수 있게 하는 행위 패턴은?',
                options: ['전략(Strategy) 패턴', '상태(State) 패턴', '템플릿 메서드 패턴', '메디에이터 패턴'],
                answerIndex: 0,
                explanation: '전략(Strategy) 패턴은 알고리즘군을 정의하고 각각을 캡슐화하여 런타임에 동적으로 교체 가능하게 합니다.'
              }
            ]
          },
          {
            id: 'task-d3-3',
            title: '객체지향 설계 5대 원칙(SOLID) 핵심 이해 및 실전문맥',
            category: '설계 원칙',
            estimatedMinutes: 30,
            difficulty: '중급',
            completed: false,
            concept: {
              topic: 'SOLID 객체지향 설계 5대 원칙',
              analogy: '튼튼한 스마트폰 부품 규격처럼, 카메라나 배터리를 바꾼다고 메인보드 전체를 뜯어고칠 필요가 없도록 하는 모듈화 원칙입니다.',
              summary: [
                'SRP (단일 책임 원칙): 하나의 클래스는 하나의 책임만 가져야 함',
                'OCP (개방-폐쇄 원칙): 확장에 대해서는 열려 있고, 변경에 대해서는 닫혀 있어야 함',
                'LSP (리스코프 치환 원칙): 자식 클래스는 부모 클래스의 기능을 완전히 대체할 수 있어야 함',
                'ISP (인터페이스 분리 원칙): 클라이언트는 사용하지 않는 인터페이스에 의존하지 않아야 함',
                'DIP (의존 역전 원칙): 구체화(구현체)가 아닌 추상화(인터페이스)에 의존해야 함'
              ],
              keyPoints: [
                'SOLID 약어와 각 원칙의 영문/한글 명칭 매칭 암기 필수',
                'OCP는 인터페이스와 다형성을 통해 실현됩니다.'
              ],
              coachTip: '시험 지문에 "추상 클래스에 의존해야 한다"가 나오면 DIP, "확장에는 열리고 수정에는 닫힌다"가 나오면 OCP를 고르세요!'
            },
            quiz: [
              {
                id: 1,
                question: 'SOLID 원칙 중 "소프트웨어 요소는 확장에는 열려 있어야 하고, 변경에는 닫혀 있어야 한다"는 원칙은?',
                options: ['개방-폐쇄 원칙 (OCP)', '단일 책임 원칙 (SRP)', '리스코프 치환 원칙 (LSP)', '의존 역전 원칙 (DIP)'],
                answerIndex: 0,
                explanation: 'OCP(Open-Closed Principle)는 기존 코드를 수정하지 않으면서 새로운 기능을 추가할 수 있도록 설계해야 한다는 원칙입니다.'
              },
              {
                id: 2,
                question: '상위 모듈은 하위 모듈의 구현에 의존해서는 안 되며, 둘 다 추상화(인터페이스)에 의존해야 한다는 원칙은?',
                options: ['의존 역전 원칙 (DIP)', '인터페이스 분리 원칙 (ISP)', '단일 책임 원칙 (SRP)', '리스코프 치환 원칙 (LSP)'],
                answerIndex: 0,
                explanation: 'DIP(Dependency Inversion Principle)는 구체적인 클래스 대신 인터페이스나 추상 클래스에 의존하도록 유도하는 원칙입니다.'
              },
              {
                id: 3,
                question: '하위 타입 객체는 상위 타입 객체를 대체하더라도 프로그램의 정확성을 깨뜨리지 않아야 한다는 원칙은?',
                options: ['리스코프 치환 원칙 (LSP)', '개방 폐쇄 원칙 (OCP)', '인터페이스 분리 원칙 (ISP)', '단일 책임 원칙 (SRP)'],
                answerIndex: 0,
                explanation: 'LSP(Liskov Substitution Principle)는 자식 클래스가 부모 클래스의 계약 규칙을 완전히 준수해야 함을 의미합니다.'
              },
              {
                id: 4,
                question: '하나의 클래스는 단 하나의 변경 이유만을 가져야 하며, 오직 한 가지 책임에만 집중해야 한다는 원칙은?',
                options: ['단일 책임 원칙 (SRP)', '인터페이스 분리 원칙 (ISP)', '의존 역전 원칙 (DIP)', '개방 폐쇄 원칙 (OCP)'],
                answerIndex: 0,
                explanation: 'SRP(Single Responsibility Principle)는 클래스가 변경되는 이유는 단 하나여야 한다는 설계 원칙입니다.'
              },
              {
                id: 5,
                question: '자신이 사용하지 않는 메서드에 의존하지 않도록, 거대한 범용 인터페이스 하나보다 작고 특화된 인터페이스 여러 개로 분리해야 한다는 원칙은?',
                options: ['인터페이스 분리 원칙 (ISP)', '리스코프 치환 원칙 (LSP)', '개방 폐쇄 원칙 (OCP)', '단일 책임 원칙 (SRP)'],
                answerIndex: 0,
                explanation: 'ISP(Interface Segregation Principle)는 클라이언트에 특화된 인터페이스 분리를 요구합니다.'
              }
            ]
          },
          {
            id: 'task-d3-4',
            title: '기출문제 풀이: 디자인 패턴 단답형 실전 5제 점검',
            category: '실전 기출',
            estimatedMinutes: 25,
            difficulty: '초급',
            completed: false,
            concept: {
              topic: '실기 단답형 빈출 키워드 공략법',
              analogy: '수능 빈출 영단어처럼 시험 지문에서 특정 키워드가 나오면 1초 만에 정답 패턴명을 떠올리는 실전 훈련입니다.',
              summary: [
                '"복잡한 서브시스템을 단순한 하나의 창구로 묶는다" -> 퍼사드(Facade)',
                '"객체 생성 과정을 단계별로 분리하여 유연하게 빌드한다" -> 빌더(Builder)',
                '"동일한 데이터를 공유하여 메모리를 절약한다" -> 플라이웨이트(Flyweight)'
              ],
              keyPoints: [
                '지문의 핵심 문장과 패턴명 1:1 매핑',
                '영문 철자(Spelling)도 정확히 표기할 수 있도록 대비'
              ],
              coachTip: '실기 시험은 부분 점수가 주어지므로 영문과 한글 표기 모두 기억해 두는 것이 안전합니다!'
            },
            quiz: [
              {
                id: 1,
                question: '복잡한 다수의 서브시스템 클래스들에 대해 단순화된 고수준의 통합 인터페이스를 제공하여 외부와의 결합도를 낮추는 구조 패턴은?',
                options: ['퍼사드(Facade) 패턴', '프록시(Proxy) 패턴', '컴포지트(Composite) 패턴', '어댑터(Adapter) 패턴'],
                answerIndex: 0,
                explanation: '퍼사드(Facade) 패턴은 건물의 정면(외관)이라는 뜻으로, 내부 복잡도를 감추고 단일 진입점을 제공합니다.'
              },
              {
                id: 2,
                question: '인스턴스를 대량으로 생성할 때 발생하는 메모리 낭비를 줄이기 위해, 객체를 공유(공통 속성 추출)하여 사용하는 구조 패턴은?',
                options: ['플라이웨이트(Flyweight) 패턴', '프로토타입(Prototype) 패턴', '싱글톤(Singleton) 패턴', '브리지(Bridge) 패턴'],
                answerIndex: 0,
                explanation: '플라이웨이트(Flyweight) 패턴은 경량 패턴으로 다수의 작은 객체를 공유하여 메모리 사용량을 최소화합니다.'
              },
              {
                id: 3,
                question: '다른 객체에 대한 접근을 제어하거나 대리인 역할을 수행하여 지연 로딩, 보안 검사, 로깅 등을 가능하게 하는 구조 패턴은?',
                options: ['프록시(Proxy) 패턴', '데코레이터(Decorator) 패턴', '어댑터(Adapter) 패턴', '퍼사드(Facade) 패턴'],
                answerIndex: 0,
                explanation: '프록시(Proxy) 패턴은 실제 대상 객체 대신 대리인 객체를 내세워 접근 제어 및 부가 기능을 수행합니다.'
              },
              {
                id: 4,
                question: '객체들을 트리 구조로 구성하여 개별 객체와 복합 객체를 클라이언트가 동일한 방법으로 다룰 수 있게 하는 구조 패턴은?',
                options: ['컴포지트(Composite) 패턴', '데코레이터(Decorator) 패턴', '어댑터(Adapter) 패턴', '빌더(Builder) 패턴'],
                answerIndex: 0,
                explanation: '컴포지트(Composite) 패턴은 부분-전체 계층을 표현하는 트리 구조를 클라이언트가 일관되게 다룰 수 있도록 합니다.'
              },
              {
                id: 5,
                question: '복잡한 객체의 생성 과정과 표현 방법을 분리하여, 동일한 생성 절차에서 서로 다른 표현 결과를 만들 수 있게 하는 생성 패턴은?',
                options: ['빌더(Builder) 패턴', '추상 팩토리 패턴', '팩토리 메서드 패턴', '프로토타입 패턴'],
                answerIndex: 0,
                explanation: '빌더(Builder) 패턴은 복합 객체의 생성 과정을 단계별로 캡슐화합니다.'
              }
            ]
          }
        ]
      },
      {
        dayOfWeek: '목',
        dayNumber: 4,
        dateStr: '10.22 (목)',
        title: '데이터베이스 정규화 & 트랜잭션',
        isToday: false,
        tasks: [
          {
            id: 'task-d4-1',
            title: '정규화 단계(1NF -> 2NF -> 3NF -> BCNF) 암기 공식 (원부이결)',
            category: '데이터베이스',
            estimatedMinutes: 40,
            difficulty: '중급',
            completed: false,
            concept: {
              topic: '관계형 데이터베이스 정규화 과정',
              analogy: '서랍장에 양말, 속옷, 티셔츠가 뒤섞여 중복과 혼란이 생기지 않도록 칸막이별로 깔끔하게 정리정돈하는 과정입니다.',
              summary: [
                '1NF: 도메인이 원자값(Atomic value)만 갖도록 분리',
                '2NF: 부분 함수적 종속성 제거 (완전 함수적 종속 달성)',
                '3NF: 이행적 함수적 종속성(A -> B -> C) 제거',
                'BCNF: 모든 결정자가 후보키가 되도록 분리'
              ],
              keyPoints: [
                '암기 키워드: "원.부.이.결.다.조" (원자값, 부분함수종속, 이행함수종속, 결정자 후보키, 다치종속, 조인종속)'
              ],
              coachTip: '"X -> Y이고 Y -> Z일 때 X -> Z가 성립하는 것"이 문제에 나오면 무조건 3정규형(이행함수종속 제거)입니다!'
            },
            quiz: [
              {
                id: 1,
                question: '릴레이션의 모든 속성 값이 원자값(Atomic Value)으로만 구성되도록 분해하는 정규화 단계는?',
                options: ['제1정규형 (1NF)', '제2정규형 (2NF)', '제3정규형 (3NF)', '보이스-코드 정규형 (BCNF)'],
                answerIndex: 0,
                explanation: '제1정규형(1NF)은 다중값을 분해하여 모든 속성 도메인이 원자값을 갖게 합니다.'
              },
              {
                id: 2,
                question: '기본키의 진부분집합이 기본키가 아닌 일반 속성을 결정하는 "부분 함수적 종속"을 제거하여 완전 함수적 종속을 만족시키는 단계는?',
                options: ['제2정규형 (2NF)', '제1정규형 (1NF)', '제3정규형 (3NF)', 'BCNF'],
                answerIndex: 0,
                explanation: '제2정규형(2NF)은 복합 기본키의 일부에 종속되는 부분 함수 종속성을 제거합니다.'
              },
              {
                id: 3,
                question: 'A -> B 이고 B -> C 일 때 A -> C 가 성립하는 "이행적 함수 종속"을 제거하는 정규화 단계는?',
                options: ['제3정규형 (3NF)', '제1정규형 (1NF)', '제2정규형 (2NF)', '제4정규형 (4NF)'],
                answerIndex: 0,
                explanation: '제3정규형(3NF)은 이행적 함수 종속성을 제거합니다.'
              },
              {
                id: 4,
                question: '트랜잭션의 4대 특성(ACID)에 해당하지 않는 것은?',
                options: ['원자성(Atomicity)', '일관성(Consistency)', '다형성(Polymorphism)', '지속성(Durability)'],
                answerIndex: 2,
                explanation: '트랜잭션 ACID는 원자성(Atomicity), 일관성(Consistency), 격리성/고립성(Isolation), 지속성(Durability)입니다.'
              },
              {
                id: 5,
                question: '트랜잭션의 ACID 특성 중 "트랜잭션의 연산은 모두 성공하거나 아니면 전혀 실행되지 않은 상태(All or Nothing)"여야 함을 의미하는 것은?',
                options: ['원자성(Atomicity)', '일관성(Consistency)', '격리성(Isolation)', '영속성(Durability)'],
                answerIndex: 0,
                explanation: '원자성(Atomicity)은 작업이 전부 실행되거나 전부 취소(Rollback)되어야 함을 보장합니다.'
              }
            ]
          }
        ]
      },
      {
        dayOfWeek: '금',
        dayNumber: 5,
        dateStr: '10.23 (금)',
        title: 'SQL 응용 & 애플리케이션 보안',
        isToday: false,
        tasks: [
          {
            id: 'task-d5-1',
            title: 'SQL DDL, DML, DCL 명령어 및 트랜잭션 TCL 완벽 구분',
            category: 'SQL',
            estimatedMinutes: 35,
            difficulty: '초급',
            completed: false,
            concept: {
              topic: 'SQL 명령어 분류',
              analogy: '건물을 짓는 공사(DDL), 가구를 배치하고 옮기는 활동(DML), 보안 경비원이 출입증을 발급하는 행위(DCL)에 해당합니다.',
              summary: [
                'DDL (데이터 정의어): CREATE, ALTER, DROP, TRUNCATE',
                'DML (데이터 조작어): SELECT, INSERT, UPDATE, DELETE',
                'DCL (데이터 제어어): GRANT, REVOKE',
                'TCL (트랜잭션 제어어): COMMIT, ROLLBACK, SAVEPOINT'
              ],
              keyPoints: [
                'DROP vs TRUNCATE vs DELETE의 차이점 (DELETE는 Rollback 가능, DDL은 자동 Commit)'
              ],
              coachTip: 'TRUNCATE는 DDL이라 ROLLBACK이 불가능하다는 점이 객관식/단답형 단골 함정입니다!'
            },
            quiz: [
              {
                id: 1,
                question: '다음 중 SQL 분류가 "데이터 정의어(DDL)"에 속하는 명령어는?',
                options: ['ALTER', 'INSERT', 'GRANT', 'COMMIT'],
                answerIndex: 0,
                explanation: 'ALTER, CREATE, DROP, TRUNCATE는 테이블 및 스키마를 정의/수정하는 DDL입니다.'
              },
              {
                id: 2,
                question: '데이터베이스 사용자에게 특정 권한을 부여할 때 사용하는 SQL DCL 명령어는?',
                options: ['GRANT', 'REVOKE', 'AUTHORIZE', 'COMMIT'],
                answerIndex: 0,
                explanation: 'GRANT는 권한을 부여하고, REVOKE는 부여된 권한을 회수합니다.'
              },
              {
                id: 3,
                question: '테이블의 모든 레코드를 삭제하지만 테이블 구조는 남겨두며, DDL 명령어로 자동 커밋되어 복구가 불가능한 명령어는?',
                options: ['TRUNCATE', 'DELETE', 'DROP', 'KILL'],
                answerIndex: 0,
                explanation: 'TRUNCATE는 DDL 명령어로 테이블 구조는 남기고 고속으로 전체 데이터를 초기화합니다.'
              },
              {
                id: 4,
                question: '웹 취약점 중 악의적인 SQL 구문을 입력값에 삽입하여 비정상적으로 DB 데이터를 열람/조작하는 공격은?',
                options: ['SQL 인젝션(SQL Injection)', 'XSS', 'CSRF', 'DDoS'],
                answerIndex: 0,
                explanation: 'SQL Injection 공격은 입력값 검증 미흡 시 쿼리문 구조를 변조하는 공격입니다.'
              },
              {
                id: 5,
                question: '웹 사용자의 웹 브라우저에서 악의적인 스크립트(JavaScript)가 실행되도록 유도하는 보안 취약점은?',
                options: ['XSS (Cross-Site Scripting)', 'SQL Injection', '스니핑(Sniffing)', '버퍼 오버플로우'],
                answerIndex: 0,
                explanation: 'XSS는 악성 스크립트가 피해자의 브라우저에서 실행되어 쿠키 탈취나 세션 하이재킹을 유발합니다.'
              }
            ]
          }
        ]
      },
      {
        dayOfWeek: '토',
        dayNumber: 6,
        dateStr: '10.24 (토)',
        title: '네트워크 프로토콜 & 보안 암호화',
        isToday: false,
        tasks: [
          {
            id: 'task-d6-1',
            title: 'OSI 7계층 및 TCP/IP 4계층 프로토콜 장비 맵핑',
            category: '네트워크',
            estimatedMinutes: 40,
            difficulty: '중급',
            completed: false,
            concept: {
              topic: 'OSI 7계층 및 네트워크 장비',
              analogy: '국제 우편물 배송 시스템에서 우체통(물리) -> 우편번호 라벨링(데이터링크) -> 배송 차량 경로 설정(네트워크) -> 수취인 전달(전송) 과정입니다.',
              summary: [
                '1계층(물리): 리피터, 허브 (단위: 비트)',
                '2계층(데이터링크): 브리지, L2 스위치 (단위: 프레임)',
                '3계층(네트워크): 라우터, L3 스위치, IP, ICMP, ARP (단위: 패킷)',
                '4계층(전송): TCP, UDP, L4 스위치 (단위: 세그먼트)'
              ],
              keyPoints: [
                'ARP는 IP -> MAC 변환, RARP는 MAC -> IP 변환',
                'TCP는 연결지향성/신뢰성, UDP는 비연결성/속도 중심'
              ],
              coachTip: 'ARP와 ICMP가 몇 계층인지 묻는 문제가 자주 나옵니다. 둘 다 3계층(네트워크 계층)입니다!'
            },
            quiz: [
              {
                id: 1,
                question: '논리적인 IP 주소를 물리적인 MAC 주소(하드웨어 주소)로 변환해 주는 프로토콜은?',
                options: ['ARP', 'RARP', 'DHCP', 'DNS'],
                answerIndex: 0,
                explanation: 'ARP(Address Resolution Protocol)는 IP 주소를 하드웨어 MAC 주소로 대응시키는 프로토콜입니다.'
              },
              {
                id: 2,
                question: 'OSI 7계층 중 종단 간(End-to-End) 신뢰성 있는 데이터 전송과 흐름 제어, 오류 제어를 담당하는 계층은?',
                options: ['전송 계층(Transport Layer)', '네트워크 계층', '세션 계층', '데이터링크 계층'],
                answerIndex: 0,
                explanation: '전송 계층(4계층)은 TCP/UDP가 위치하며 종단 간의 신뢰성 있는 통신을 책임집니다.'
              },
              {
                id: 3,
                question: 'IP 패킷 전송 중 오류 발생 시 에러 보고 및 네트워크 진단 메시지(예: ping 명령)를 전달하는 프로토콜은?',
                options: ['ICMP', 'IGMP', 'SNMP', 'SMTP'],
                answerIndex: 0,
                explanation: 'ICMP(Internet Control Message Protocol)는 IP의 신뢰성 결여를 보완하기 위한 에러 보고용 프로토콜입니다.'
              },
              {
                id: 4,
                question: '비대칭키(공개키) 암호화 알고리즘의 대표적인 예시는?',
                options: ['RSA', 'AES', 'DES', 'SEED'],
                answerIndex: 0,
                explanation: 'RSA, ECC는 공개키(비대칭키) 암호화 알고리즘이고, AES, DES, SEED는 대칭키(비밀키) 블록 암호화 알고리즘입니다.'
              },
              {
                id: 5,
                question: '임의의 길이의 데이터를 입력받아 고정된 길이의 고유한 문자열로 변환하며, 역산이 불가능한 일방향 암호화 기술은?',
                options: ['해시(Hash) 함수', '대칭키 암호화', '공개키 암호화', '스트림 암호화'],
                answerIndex: 0,
                explanation: '해시 함수(SHA-256 등)는 데이터의 무결성 검증과 비밀번호 저장에 쓰이는 단방향 암호화 기술입니다.'
              }
            ]
          }
        ]
      },
      {
        dayOfWeek: '일',
        dayNumber: 7,
        dateStr: '10.25 (일)',
        title: '1주차 실전 모의고사 & 약점 집중 보완',
        isToday: false,
        tasks: [
          {
            id: 'task-d7-1',
            title: '1~6일차 오답노트 점검 및 실전 모의테스트 20문항 응시',
            category: '실전 모의고사',
            estimatedMinutes: 50,
            difficulty: '고급',
            completed: false,
            concept: {
              topic: '실기 60점 합격선 넘기 전략',
              analogy: '마라톤 풀코스 전 하프 마라톤을 뛰어보며 페이스와 부족한 체력 구간을 확인하는 리허설입니다.',
              summary: [
                '프로그래밍 언어(C/Java/Python) 코드 실행 결과 예측 문제는 1문제당 5점 배점으로 당락을 결정함',
                'SQL 작성 문제(SELECT, UPDATE 등)는 쉼표, 세미콜론 철저 검증',
                '단답형 신기술 용어는 약어의 풀네임을 상기하며 기재'
              ],
              keyPoints: [
                '100점 만점 중 60점 이상 합격 (과락 없음)',
                '아는 문제부터 확실하게 적고 모르는 문제는 유추하여 빈칸 없이 작성'
              ],
              coachTip: '틀린 문제만 다시 보는 오답노트 복습이 마지막 날 점수를 10점 올려줍니다!'
            },
            quiz: [
              {
                id: 1,
                question: '소프트웨어 테스트 기법 중 프로그램의 내부 로직이나 소스 코드를 보지 않고 입력값에 따른 출력 결과만을 검증하는 기법은?',
                options: ['블랙박스 테스트', '화이트박스 테스트', '구조 기반 테스트', '경로 커버리지 테스트'],
                answerIndex: 0,
                explanation: '블랙박스 테스트는 동등분할, 경계값 분석 등 명세 기반으로 내부 구조를 모르는 상태에서 테스트합니다.'
              },
              {
                id: 2,
                question: '결함 집중(Defect Clustering)과 관련하여 "소프트웨어의 80% 결함은 전체 모듈의 20% 내에 집중되어 있다"는 원리는?',
                options: ['파레토의 법칙 (Pareto principle)', '살충제 패러독스', '오류-부재의 궤변', '브룩스의 법칙'],
                answerIndex: 0,
                explanation: '파레토 법칙(80:20 법칙)은 결함이 특정 모듈에 집중적으로 발생하는 현상을 설명합니다.'
              },
              {
                id: 3,
                question: '동일한 테스트 케이스로 반복 테스트를 실행하면 더 이상 새로운 결함을 발견할 수 없게 되는 현상은?',
                options: ['살충제 패러독스 (Pesticide Paradox)', '오류 부재의 궤변', '테스트의 맥락 의존성', '파레토 법칙'],
                answerIndex: 0,
                explanation: '살충제 패러독스는 새로운 결함을 찾기 위해 테스트 케이스를 정기적으로 개선해야 함을 뜻합니다.'
              },
              {
                id: 4,
                question: '화이트박스 테스트의 검증 기준 중 프로그램의 모든 문장(Statement)이 적어도 한 번은 실행되도록 구성하는 기준은?',
                options: ['구문 커버리지 (Statement Coverage)', '결정 커버리지', '조건 커버리지', '다중 조건 커버리지'],
                answerIndex: 0,
                explanation: '구문 커버리지(문장 커버리지)는 코드의 모든 라인이 최소 한 번 실행되는지 측정합니다.'
              },
              {
                id: 5,
                question: '시스템의 변경이나 버그 수정 후, 기존에 잘 동작하던 다른 기능에 새로운 결함이 생기지 않았는지 재검증하는 테스트는?',
                options: ['회귀 테스트 (Regression Test)', '스모크 테스트', '스트레스 테스트', '인수 테스트'],
                answerIndex: 0,
                explanation: '회귀 테스트(Regression Test)는 코드 수정 이후 사이드 이펙트나 부작용을 확인하는 재시험입니다.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'sqld',
    name: 'SQLD 자격증 취득',
    defaultHours: '1.5시간',
    description: 'SQL 개발자 자격증 대비 데이터 모델링과 SQL 기본/활용 집중 완성 코스',
    days: [
      {
        dayOfWeek: '수',
        dayNumber: 3,
        dateStr: '10.21 (수)',
        title: 'JOIN 및 서브쿼리 마스터',
        isToday: true,
        tasks: [
          {
            id: 'task-sqld-1',
            title: 'INNER JOIN vs OUTER JOIN vs CROSS JOIN 차이점 정복',
            category: 'SQL JOIN',
            estimatedMinutes: 35,
            difficulty: '초급',
            completed: false,
            concept: {
              topic: 'SQL 조인(Join) 연산의 원리와 종류',
              analogy: '두 학급의 명부를 펴놓고 생일이 같은 학생끼리 짝을 짓는 작업입니다. 매칭되는 사람만 남기면 INNER, 한쪽 반 학생은 다 남기면 OUTER입니다.',
              summary: [
                'INNER JOIN: 두 테이블의 조인 조건을 만족하는 교집합 행만 반환',
                'LEFT/RIGHT OUTER JOIN: 기준 테이블의 모든 행을 보존하고 매칭되지 않는 열은 NULL로 표시',
                'CROSS JOIN: 카티시안 곱(Cartesian Product)으로 A테이블 N개 x B테이블 M개 행 반환'
              ],
              keyPoints: [
                'OUTER JOIN 시 조건의 위치(ON 절 vs WHERE 절)에 따른 결과 차이 주의',
                'USING 절 사용 시 컬럼 접두사(alias)를 붙이면 오류 발생'
              ],
              coachTip: 'SQLD에서 LEFT OUTER JOIN 결과 행의 수와 NULL 위치를 묻는 문제가 매회 출제됩니다!'
            },
            quiz: [
              {
                id: 1,
                question: 'LEFT OUTER JOIN에서 오른쪽 테이블에 일치하는 행이 없을 때 해당 열에 채워지는 값은?',
                options: ['NULL', '0', '빈 문자열("")', 'DEFAULT 값'],
                answerIndex: 0,
                explanation: 'OUTER JOIN에서 매칭되지 않는 상대 테이블의 속성값은 NULL로 채워집니다.'
              },
              {
                id: 2,
                question: '테이블 A의 행 수가 5개, 테이블 B의 행 수가 4개일 때 두 테이블을 CROSS JOIN한 결과 행의 수는?',
                options: ['20개', '9개', '5개', '1개'],
                answerIndex: 0,
                explanation: 'CROSS JOIN(카티시안 곱)은 5 * 4 = 20개의 행이 생성됩니다.'
              },
              {
                id: 3,
                question: '스칼라 서브쿼리(Scalar Subquery)가 반환하는 결과의 형태는?',
                options: ['1개 행, 1개 열 (단일 값)', '다중 행, 1개 열', '단일 행, 다중 열', '다중 행, 다중 열'],
                answerIndex: 0,
                explanation: '스칼라 서브쿼리는 SELECT 절에 주로 사용되며 반드시 단 하나의 단일값(1행 1열)을 반환해야 합니다.'
              },
              {
                id: 4,
                question: '서브쿼리 연산자 중 메인쿼리의 값과 서브쿼리 결과 중 하나라도 일치하면 참이 되는 연산자는?',
                options: ['IN', 'ALL', 'EXISTS', 'NOT IN'],
                answerIndex: 0,
                explanation: 'IN 연산자는 다중 행 서브쿼리 결과 목록에 일치하는 값이 하나라도 있으면 TRUE입니다.'
              },
              {
                id: 5,
                question: '윈도우 함수(Window Function)에서 그룹 내 순위를 매길 때 동순위가 발생하면 건너뛰지 않고 1, 2, 2, 3 순으로 매기는 함수는?',
                options: ['DENSE_RANK()', 'RANK()', 'ROW_NUMBER()', 'NTILE()'],
                answerIndex: 0,
                explanation: 'RANK()는 1, 2, 2, 4 순으로 건너뛰고, DENSE_RANK()는 누적하여 1, 2, 2, 3 순으로 매깁니다.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'python-algo',
    name: '파이썬 코딩테스트 기초',
    defaultHours: '2시간',
    description: '코딩테스트 필수 자료구조(스택/큐/해시) 및 완전탐색/DFS/BFS 입문',
    days: [
      {
        dayOfWeek: '수',
        dayNumber: 3,
        dateStr: '10.21 (수)',
        title: '스택/큐 & 완전탐색 DFS/BFS',
        isToday: true,
        tasks: [
          {
            id: 'task-py-1',
            title: 'DFS(깊이 우선 탐색) vs BFS(너비 우선 탐색) 개념과 구현 템플릿',
            category: '알고리즘',
            estimatedMinutes: 45,
            difficulty: '중급',
            completed: false,
            concept: {
              topic: 'DFS와 BFS의 원리 및 자료구조 매핑',
              analogy: '미로에서 막다른 길이 나올 때까지 한 우물만 파고 들어가는 것이 DFS, 물에 돌을 던졌을 때 동심원이 사방으로 퍼져나가는 것이 BFS입니다.',
              summary: [
                'DFS(깊이 우선 탐색): 스택(Stack) 또는 재귀 함수로 구현. 모든 노드를 방문해야 할 때나 백트래킹에 유리',
                'BFS(너비 우선 탐색): 큐(Queue/collections.deque)로 구현. 가중치가 1인 최단 경로 탐색에 필수',
                '시간 복잡도: 인접 리스트 O(V + E), 인접 행렬 O(V^2)'
              ],
              keyPoints: [
                '파이썬에서는 재귀 한도(sys.setrecursionlimit) 설정 주의',
                'BFS는 반드시 deque를 사용하여 popleft() 시간 복잡도 O(1) 유지'
              ],
              coachTip: '최단 거리나 최소 이동 횟수를 구하라는 문제가 나오면 90% 이상 BFS 문제입니다!'
            },
            quiz: [
              {
                id: 1,
                question: '가중치가 동일한 그래프에서 두 정점 사이의 "최단 경로(최소 이동 횟수)"를 구할 때 가장 적합한 탐색 알고리즘은?',
                options: ['BFS (너비 우선 탐색)', 'DFS (깊이 우선 탐색)', '이진 탐색 (Binary Search)', '그리디 알고리즘'],
                answerIndex: 0,
                explanation: 'BFS는 출발점에서 거리가 1, 2, 3... 인 정점들을 레벨별로 탐색하므로 가장 먼저 목표 노드에 도달한 경로가 최단 경로임이 보장됩니다.'
              },
              {
                id: 2,
                question: 'BFS를 구현할 때 필수적으로 사용하는 대표적인 자료구조는?',
                options: ['큐 (Queue)', '스택 (Stack)', '우선순위 큐 (Heap)', '연결 리스트'],
                answerIndex: 0,
                explanation: 'BFS는 먼저 방문한 노드의 인접 노드들을 순서대로 처리하기 위해 선입선출(FIFO) 큐를 사용합니다.'
              },
              {
                id: 3,
                question: '파이썬의 기본 list로 큐를 구현하여 pop(0)을 수행할 때의 시간 복잡도는?',
                options: ['O(N)', 'O(1)', 'O(log N)', 'O(N^2)'],
                answerIndex: 0,
                explanation: '파이썬 리스트의 pop(0)은 앞 요소를 빼고 뒤 요소들을 전부 앞으로 한 칸씩 당기므로 O(N)입니다. 따라서 O(1)인 collections.deque의 popleft()를 써야 합니다.'
              },
              {
                id: 4,
                question: '미로 찾기에서 모든 경로를 탐색하거나 조건을 만족하는 경우의 수를 셀 때 주로 사용하는 알고리즘 기법은?',
                options: ['DFS / 백트래킹', '다익스트라', '크루스칼', '벨만-포드'],
                answerIndex: 0,
                explanation: '가능한 모든 상태 트리를 깊이 파고들며 유효하지 않은 경로는 되돌아 나오는(Pruning) 기법에 DFS/백트래킹이 쓰입니다.'
              },
              {
                id: 5,
                question: '파이썬에서 기본 재귀 깊이 제한(기본 1000)을 늘려줄 때 사용하는 sys 모듈의 함수는?',
                options: ['sys.setrecursionlimit()', 'sys.setMaxDepth()', 'sys.setRecursion()', 'sys.limit()'],
                answerIndex: 0,
                explanation: 'sys.setrecursionlimit(10**6) 과 같이 재귀 호출 깊이 한도를 풀어줄 때 사용합니다.'
              }
            ]
          }
        ]
      }
    ]
  }
];

